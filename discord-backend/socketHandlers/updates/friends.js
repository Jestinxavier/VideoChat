const User = require("../../models/User");
const FriendInvitation = require("../../models/Friendinvitation");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitation = async (userId) => {
  // To get all the  user socket ID
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_Id username mail");
    // Find all active connections of specific user ID

    const reciverList = serverStore.getActiveConnection(userId);
    const io = serverStore.getSocketServerInstance();
    reciverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("friends-invitations", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

const updateFriends = async (userId) => {
  try {
    const reciverList = serverStore.getActiveConnection(userId);
    if (reciverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username mail"
      );
      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
          };
        });

        // find active connection odf specific id (online user)

        const reciverList = serverStore.getActiveConnection(userId);

        // get the io server  instance

        const io = serverStore.getSocketServerInstance();
        reciverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit("friends-list", {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {
  updateFriendsPendingInvitation,
  updateFriends
};
