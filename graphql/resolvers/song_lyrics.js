const { UserInputError } = require("apollo-server");

const User = require("../../models/user");
const Song = require("../../models/song");
const Lyric = require("../../models/lyric");
const auth = require("../../util/auth");

module.exports = {
  Query: {
    songs: async () => await Song.find({}).sort({ createdAt: "desc" }),

    song: async (_, { id }) => await Song.findById(id),
  },
  Mutation: {
    addSong: async (_, { title }, context) => {
      const loggedUser = auth(context);
      const user = await User.findById(loggedUser.id);
      const song = new Song({
        user,
        title,
        createdAt: new Date().toISOString(),
      });
      const result = await song.save();
      console.log(result);
      return result;
    },
    addLyricToSong: async (_, { content, songId }, context) => {
      const loggedUser = auth(context);
      const user = await User.findById(loggedUser.id);
      const song = await Song.findById(songId);
      if (!song) {
        throw new UserInputError("song doesnt exist", {
          error: { song: "Song not found" },
        });
      } else if (user.id !== song.user.toString()) {
        throw new UserInputError("Action forbidden", {
          error: { song: "Unauthorized User" },
        });
      }
      const lyric = new Lyric({ content, song });
      song.lyrics.push(lyric);
      await lyric.save();
      const result = await song.save();
      console.log("r", result);
      return result;
    },
    deleteSong: async (_, { songId }, context) => {
      const loggedUser = auth(context);
      const user = await User.findById(loggedUser.id);
      const song = await Song.findById(songId);
      if (!song) {
        throw new UserInputError("Song doesn't exist", {
          error: { song: "Song not found" },
        });
      } else if (user.id !== song.user.toString()) {
        throw new UserInputError("Action forbidden", {
          error: { song: "Unauthorized User" },
        });
      }
      (await Song.deleteOne({ _id: songId })) +
        (await Lyric.deleteMany({ song: { $eq: songId } }));

      return "deleted successfully";
    },
    likeLyric: async (_, { lyricId }) => {
      const lyric = await Lyric.findById(lyricId);
      console.log(lyric);
      if (lyric) {
        lyric.likes++;
      }
      return await lyric.save();
    },
  },
  SongType: {
    lyrics: async (parent, args) => {
      console.log(parent.lyrics);
      const lyrics = await Lyric.find({ _id: { $in: parent.lyrics } });
      console.log("ly", lyrics);
      return lyrics;
    },
    user: async (parent) => {
      return await User.findById(parent.user);
    },
  },
  LyricType: {
    song: async (parent) => {
      console.log(2, parent);
      const song = await Song.findById(parent.song);
      return song;
    },
  },
};
