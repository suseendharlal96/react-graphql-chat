const { model, Schema } = require("mongoose");

const reactionSchema = new Schema({
  content: { type: String, required: true },
  uuid: { type: String, required: true },
  createdAt: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  messageId: { type: Schema.Types.ObjectId, ref: "Message" },
});

module.exports = model("Reaction", reactionSchema);
