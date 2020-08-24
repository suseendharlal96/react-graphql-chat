const { UserInputError } = require("apollo-server");

const { v4: uuidv4 } = require("uuid");

const Message = require("../../models/message");
const User = require("../../models/user");
const auth = require("../../util/auth");

module.exports = {
  Query: {
    getMessages: async (_, { from }, context) => {
      const loggedUser = auth(context);
      const otherUser = await User.findOne({ username: from });
      if (!otherUser) {
        throw new UserInputError("User not found");
      }
      const findMessagesIn = [otherUser.email, loggedUser.email];
      const messages = await Message.find({
        $and: [
          { to: { $in: findMessagesIn } },
          { from: { $in: findMessagesIn } },
        ],
      }).sort({ createdAt: "desc" });
      console.log("messages", messages);
      return messages;
    },
  },
  Mutation: {
    sendMessage: async (_, { content, to }, context) => {
      const loggedUser = auth(context);
      const messageReceiver = await User.findOne({ email: to });
      console.log("r", messageReceiver);
      if (!messageReceiver) {
        throw new UserInputError("User doesnt exist");
      } else if (messageReceiver.email === loggedUser.email) {
        throw new UserInputError("You cant message yourself");
      }
      if (content.trim().length === 0) {
        throw new UserInputError("Message is empty");
      }
      const message = new Message({
        from: loggedUser.email,
        to,
        uuid: uuidv4(),
        content,
        createdAt: new Date(),
      });
      const result = await message.save();
      console.log(result);
      return result;
    },
  },
};
