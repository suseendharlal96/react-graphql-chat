const userResolver = require("./users");
const messageResolver = require("./message");
const songlyricResolver = require("./song_lyrics");
module.exports = {
  Query: {
    ...userResolver.Query,
    ...messageResolver.Query,
    ...songlyricResolver.Query,
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
  SongType: {
    ...songlyricResolver.SongType,
  },
  LyricType: {
    ...songlyricResolver.LyricType,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...messageResolver.Mutation,
    ...songlyricResolver.Mutation,
  },
  Subscription: {
    ...songlyricResolver.Subscription,
  },
};
