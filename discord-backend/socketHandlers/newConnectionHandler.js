const serverStore = require("../serverStore");
const friendsUpdate = require("../socketHandlers/updates/friends");
const roomsUpdate = require("../socketHandlers/updates/rooms");

/**
 *
 * @param {*} socket
 * @param {*} io
 * n
 */
const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending friends invitations list
  friendsUpdate.updateFriendsPendingInvitation(userDetails.userId);

  // update friends list
  friendsUpdate.updateFriends(userDetails.userId);
  setTimeout(() => {
    roomsUpdate.updateRooms(socket.id);
  }, 500);
};

module.exports = newConnectionHandler;
