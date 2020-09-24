const { Schema, model } = require("mongoose");

const fileSchema = new Schema({
  fileurl: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("File", fileSchema);
