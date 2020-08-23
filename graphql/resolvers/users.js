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

const myusers = [{ username: "sus" }, { username: "sug" }];

const company = [
  { username: "sus", sname: "1" },
  { username: "sus", sname: "2" },
  { username: "sug", sname: "3" },
];
module.exports = {
  Query: {
    getUsers: async (_, args, context) => {
      try {
        const loggedUser = auth(context);
        const users = await User.find({ email: { $ne: loggedUser.email } });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    signin: async (_, { email, password }) => {
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
    },
    getMyUsers: () => {
      return myusers;
    },
    getMyUser: (_, { username }) => {
      return myusers.find((u) => u.username === username);
    },
  },
  MyUser: {
    mycompany(parent) {
      const a = company.filter((c) => c.username === parent.username);
      const c = {};
      a.forEach((obj) => {
        c.usernamez = obj.username;
        c.sname = obj.sname;
      });
      return [c];
    },
  },
  Company: {
    myhome(parent) {
      return {
        name: "dsfds",
      };
    },
  },
  Home: {
    myfactory(parent) {
      return {
        name: "adsf",
      };
      // return company.find((c) => c.username === parent.username);
    },
  },

  Mutation: {
    signup: async (
      _,
      { signupInput: { username, email, password, confirmPassword } }
    ) => {
      const { errors, isValid } = validateSignupInput(
        username,
        email,
        password,
        confirmPassword
      );
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
    },
  },
};
