const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});

module.exports = model("Message", messageSchema);
