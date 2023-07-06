const Friendinvitation = require('../../models/Friendinvitation');
const friendsUdates = require('../../socketHandlers/updates/friends');
const User = require('../../models/User')
const postAccept = async (req,res)=>{
    // return res.send('Accept handler');

    try {
    const {id} = req.body;
const invitation = await Friendinvitation.findById(id)
if(!invitation){
    return res.status(401).send('Error occurred. Please try again')
}
const {senderId,receiverId} = invitation;
// add friends on both users
const senderUser = await User.findById(senderId);
// senderUser.friends=[...senderUser,receiverId];
senderUser.friends.push(receiverId);

const receiverUser = await User.findById(receiverId);
receiverUser.friends.push(senderId);
// receiverUser.friends=[...receiverUser,senderId];
await senderUser.save();
await receiverUser.save();
// delete invitation
await Friendinvitation.findByIdAndDelete(id)

// update list of the friends if user are online 
friendsUdates.updateFriends(senderId.toString());
friendsUdates.updateFriends(receiverId.toString())

// update list of pending invitation 
friendsUdates.updateFriendsPendingInvitation(receiverId.toString());

return res.status(200).send("Friend successfully added! ")

    } catch (error) {
        console.log(error);
        return res.status(500).send('Something wend wrong. Please try again')
    }

}
module.exports = postAccept;