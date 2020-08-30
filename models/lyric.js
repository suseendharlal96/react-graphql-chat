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
  likes: [{ type: String, required: true }],
});

module.exports = model("Lyric", lyricSchema);
