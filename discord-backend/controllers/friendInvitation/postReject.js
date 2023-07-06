const Friendinvitation = require("../../models/Friendinvitation");
const friendsUpdates = require('../../socketHandlers/updates/friends')
const postReject = async (req,res)=>{
    // return res.send('rejuct handler');
    try {
        const {id}  = req.body;
        const {userId} = req.user; 
        // remove the invitation from friend invitation
        const invitationExist = await Friendinvitation.exists({_id:id})
        if(invitationExist){
            await Friendinvitation.findByIdAndDelete(id);

        }
        // update pending invitations
        friendsUpdates.updateFriendsPendingInvitation(userId)
        return res.status(200).send("Invitation successfully Rejected")
    } catch (error) {
        console.log(error);
        return res.status(500).send('some think went wrong please try again')
    }
}

module.exports = postReject;