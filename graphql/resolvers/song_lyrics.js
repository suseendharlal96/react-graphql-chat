const { UserInputError } = require("apollo-server");
const Song = require("../../models/song");
const Lyric = require("../../models/lyric");
module.exports = {
  Query: {
    songs: async () => {
      return await Song.find({}).sort({ title: "desc" });
    },
    song: async (parent, { id }) => {
      return await Song.findById(id);
    },
  },
  Mutation: {
    addSong: async (parent, { title }) => {
      const song = new Song({
        title,
      });
      const result = await song.save();
      console.log(result);
      return result;
    },
    addLyricToSong: async (parent, { content, songId }) => {
      const song = await Song.findById(songId);
      if (!song) {
        throw new UserInputError("song doesnt exist", {
          error: { song: "Song not found" },
        });
      }
      const lyric = new Lyric({ content, song });
      song.lyrics.push(lyric);
      await lyric.save();
      const result = await song.save();
      console.log("r", result);
      return result;
    },
    deleteSong: async (parent, { songId }) => {
      const song = await Song.deleteOne({ _id: songId });
      const lyric = await Lyric.deleteMany({ song: { $eq: songId } });
      return "deleted successfully";
    },
  },
  SongType: {
    lyrics: async (parent, args) => {
      console.log(parent.lyrics);
      const lyrics = await Lyric.find({ _id: { $in: parent.lyrics } });
      console.log("ly", lyrics);
      return lyrics;
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
