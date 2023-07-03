const mongoose = require('mongoose');

const {Schema} = mongoose
const friendInvitationSchema = new Schema({
    senderId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
});




module.exports = mongoose.model("FriendInvitation",friendInvitationSchema);