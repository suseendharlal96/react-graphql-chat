const User = require("../../models/user");
// const users = [
//   { name: "susee", email: "sus@gmail.com" },
//   { name: "sug", email: "sug@gmail.com" },
// ];

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        console.log(users);
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    getUser: (_, { name }) => users.find((u) => u.name === name),
  },
  Mutation: {
    signup: async (
      _,
      { signupInput: { username, email, password, confirmpassword } }
    ) => {
      try {
        // console.log(username);
        const newUser = new User({
          username,
          email,
        });
        const result = await newUser.save();
        console.log(result._doc);
        return result._doc;
      } catch (err) {
        console.log(object);
      }
    },
  },
};
