const { model, Schema } = require("mongoose");

const lyricSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  song: {
    type: Schema.Types.ObjectId,
    ref: "Song",
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Lyric", lyricSchema);
