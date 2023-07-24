const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

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
    }else{
        await Conversation.create({
            participants: [userId, receiverUserId],
            messages: [message._id]
        })
    }
  } catch (error) {}
};
