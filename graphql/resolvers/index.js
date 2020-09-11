const userResolver = require("./users");
const messageResolver = require("./message");
const songlyricResolver = require("./song_lyrics");
module.exports = {
  Query: {
    ...userResolver.Query,
    ...messageResolver.Query,
    ...songlyricResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...messageResolver.Mutation,
    ...songlyricResolver.Mutation,
  },
  Subscription: {
    // ...songlyricResolver.Subscription,
    ...messageResolver.Subscription,
  },
  Reaction: {
    ...messageResolver.Reaction,
  },
  // song-lyric
  SongType: {
    ...songlyricResolver.SongType,
  },
  LyricType: {
    ...songlyricResolver.LyricType,
  },
  // sample
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
};
