const {
  UserInputError,
  AuthenticationError,
  withFilter,
} = require("apollo-server");

const { v4: uuidv4 } = require("uuid");

const Message = require("../../models/message");
const User = require("../../models/user");

const MESSAGE_SENT = "MESSAGE_SENT";
module.exports = {
  Query: {
    getMessages: async (_, { from }, { loggedUser }) => {
      if (!loggedUser) {
        throw new AuthenticationError("Unauthenticated");
      }
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
  Message: {
    createdAt: (parent) => {
      console.log(parent);
      return new Date(parent.createdAt).toISOString();
    },
  },
  Mutation: {
    sendMessage: async (_, { content, to }, { loggedUser, pubSub }) => {
      if (!loggedUser) {
        throw new AuthenticationError("Unauthenticated");
      }
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
        createdAt: new Date().toISOString(),
      });
      const result = await message.save();
      console.log(result);
      pubSub.publish(MESSAGE_SENT, { messageSent: result });
      return result;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (parent, args, { loggedUser, pubSub }) => {
          console.log(loggedUser);
          if (!loggedUser) {
            throw new AuthenticationError("Unauthenticated");
          }
          return pubSub.asyncIterator([MESSAGE_SENT]);
        },
        ({ messageSent }, _, { loggedUser }) => {
          if (
            messageSent.to === loggedUser.email ||
            messageSent.from === loggedUser.email
          ) {
            return true;
          }
          return false;
        }
      ),
    },
  },
};
