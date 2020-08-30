const { model, Schema } = require("mongoose");

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  lyrics: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lyric",
    },
  ],
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = model("Song", songSchema);
