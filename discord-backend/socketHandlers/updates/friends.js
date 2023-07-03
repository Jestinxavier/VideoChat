const User = require('../../models/User');
const FriendInvitation = require('../../models/Friendinvitation');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitation = async(userId)=>{

   // To get all the  user socket ID
   try {
    const pendingInvitations = await FriendInvitation.find({
        receiverId:userId
    }).populate("senderId","_Id username mail");
    console.log(pendingInvitations,"pendingInvitations🤔");
    // Find all active connections of specific user ID

    const reciverList = serverStore.getActiveConnection(userId)
    const io = serverStore.getSocketServerInstance()
    reciverList.forEach(receiverSocketId=>{
        io.to(receiverSocketId).emit('friends-invitations',
        {
            pendingInvitations :pendingInvitations? pendingInvitations:[],
        }); 
    })
   } catch (error) {
    console.log(error.message);
   }
    
}

module.exports ={
    updateFriendsPendingInvitation,
}