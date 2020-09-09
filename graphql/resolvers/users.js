// global imports
const { UserInputError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createWriteStream, mkdir } = require("fs");

// local imports
const User = require("../../models/user");
const Message = require("../../models/message");
const File = require("../../models/file");
const {
  validateSigninInput,
  validateSignupInput,
} = require("../../util/validation");
// const auth = require("../../util/auth");
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

const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = new Date().toISOString();
  const path = `./images/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path, filename, mimetype }))
      .on("error", reject)
  );
};

const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const file = await storeUpload({ stream, filename, mimetype });
  return file;
};

const myusers = [{ username: "sus" }, { username: "sug" }];

const company = [
  { username: "sus", sname: "1" },
  { username: "sus", sname: "2" },
  { username: "sug", sname: "3" },
];
module.exports = {
  Query: {
    getUsers: async (_, __, { loggedUser }) => {
      try {
        if (!loggedUser) {
          throw new AuthenticationError("Unauthenticated");
        }
        // const loggedUser = auth(context);
        let otherUsers = await User.find({ email: { $ne: loggedUser.email } });
        const loggedUserMessages = await Message.find({
          $or: [
            { to: { $eq: loggedUser.email } },
            { from: { $eq: loggedUser.email } },
          ],
        }).sort({ createdAt: "desc" });
        otherUsers = otherUsers.map((otherUser) => {
          const latestMessage = loggedUserMessages.find(
            (m) => m.from === otherUser.email || m.to === otherUser.email
          );
          if (latestMessage !== undefined) {
            otherUser.latestMessage = latestMessage;
          }
          return otherUser;
        });
        return otherUsers;
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
            password: "Invalid credentials",
          },
        });
      }
      const token = generateToken(user);
      console.log(user._doc);
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    getMyUsers: () => {
      return myusers;
    },
    getMyUser: (_, { username }) => {
      return myusers.find((u) => u.username === username);
    },
    files: async () => {
      return await File.find();
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
  User: {
    id: async (parent) => {
      return await User.find({ username: parent.username });
    },
  },

  Mutation: {
    signup: async (
      _,
      { signupInput: { username, email, password, confirmPassword, imageUrl } }
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
        imageUrl,
        createdAt: new Date().toISOString(),
      });
      const result = await newUser.save();
      const token = generateToken(result);
      return { ...result._doc, id: result.id, token };
    },
    uploadFile: async (_, { file }) => {
      console.log(file);
      mkdir("./images", { recursive: true }, (err) => {
        if (err) throw err;
      });
      const upload = await processUpload(file);
      // save our file to the mongodb
      await File.create(upload);
      return upload;
    },
  },
};
