const serverStore = require('../serverStore')
const friendsUpdate = require("../socketHandlers/updates/friends");
const roomsUpdate = require("../socketHandlers/updates/rooms");
 

/**
 * 
 * @param {*} socket 
 * @param {*} io 
 * n
 */
const newConnectionHandler = async(socket,io)=>{

    const userDetails = socket.user;
    serverStore.addNewConnectedUser({
            socketId: socket.id,
            userId : userDetails.userId,
            
        })

  // update pending friends invitations list
  friendsUpdate.updateFriendsPendingInvitation(userDetails.userId);


  // update friends list
  friendsUpdate.updateFriends(userDetails.userId);

  roomsUpdate.updateRooms(socket.id)
}



module.exports = newConnectionHandler;
