const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const chatUpdates = require("./updates/chat");

const directMessageHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId, content } = data;
    const message = await Message.create({
      author: userId,
      date: new Date(),
      content,
      type: "DIRECT",
    });

    const conversation = await Conversation.findOne({
        participants:{$all: [userId, receiverUserId]}
    })

    if (conversation) {
        conversation.messages.push(message._id);
        await conversation.save();
        chatUpdates.updateChatHistory(conversation._id.toString())
    }else{
        const newConversation=await Conversation.create({
            participants: [userId, receiverUserId],
            messages: [message._id]
        })
        chatUpdates.updateChatHistory(newConversation._id.toString())
    }
  } catch (error) {}
};

module.exports = directMessageHandler;
