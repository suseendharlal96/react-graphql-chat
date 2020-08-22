const userResolver = require("./users");

module.exports = {
  Query: {
    ...userResolver.Query,
  },
  MyUser: {
    ...userResolver.MyUser,
  },
  Company: {
    ...userResolver.Company,
  },
  Home: {
    ...userResolver.Home,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};
