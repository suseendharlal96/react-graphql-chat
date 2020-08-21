// global imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

// local imports
const User = require("../../models/user");
const {
  validateSigninInput,
  validateSignupInput,
} = require("../../util/validation");
const auth = require("../../util/auth");
const { SECRET_KEY } = require("../../config");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      password: user.password,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Query: {
    getUsers: async (_, args, context) => {
      try {
        const loggedUser = auth(context);
        const users = await User.find({ email: { $ne: loggedUser.email } });
        console.log(users.length);
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    getUser: (_, { name }) => users.find((u) => u.name === name),
  },
  Mutation: {
    signin: async (_, { email, password }) => {
      try {
        const { errors, isValid } = validateSigninInput(email, password);
        console.log(errors, isValid);
        if (!isValid) {
          throw new UserInputError("errors", { errors });
        }
        const user = await User.findOne({ email });
        if (!user) {
          throw new UserInputError("email doesn't exists", {
            errors: {
              email: "Invalid credentials",
            },
          });
        }
        const isPassmatch = await bcrypt.compare(password, user.password);
        if (!isPassmatch) {
          throw new UserInputError("pass doesn't match", {
            errors: {
              email: "Invalid credentials",
            },
          });
        }
        const token = generateToken(user);
        return {
          ...user._doc,
          token,
        };
      } catch (error) {
        throw new UserInputError("bad input", {
          error,
        });
      }
    },
    signup: async (
      _,
      { signupInput: { username, email, password, confirmpassword } }
    ) => {
      try {
        const { errors, isValid } = validateSignupInput(
          username,
          email,
          password,
          confirmpassword
        );
        console.log(errors, isValid);
        if (!isValid) {
          throw new UserInputError("errors", { errors });
        }
        const isUsername = await User.findOne({ username });
        const isEmail = await User.findOne({ email });
        if (isUsername || isEmail) {
          if (isUsername) {
            throw new UserInputError("username already taken", {
              errors: {
                username: "Username already taken",
              },
            });
          }
          if (isEmail) {
            throw new UserInputError("email already taken", {
              errors: {
                email: "Email already taken",
              },
            });
          }
        }
        const hashPass = await bcrypt.hash(password, 12);
        const newUser = new User({
          username,
          email,
          password: hashPass,
        });
        const result = await newUser.save();
        const token = generateToken(result);
        return { ...result._doc, token };
      } catch (err) {
        console.log(object);
        throw new UserInputError("bad input", err);
      }
    },
  },
};
