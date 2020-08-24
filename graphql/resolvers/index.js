const userResolver = require("./users");
const messageResolver = require("./message");
module.exports = {
  Query: {
    ...userResolver.Query,
    ...messageResolver.Query,
  },
  MyUser: {
    ...userResolver.MyUser,
  },
  Message: {
    ...messageResolver.Message,
  },
  Company: {
    ...userResolver.Company,
  },
  Home: {
    ...userResolver.Home,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...messageResolver.Mutation,
  },
};
