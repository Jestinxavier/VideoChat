const serverStore = require('../serverStore')

/**
 * 
 * @param {*} socket 
 * @param {*} io 
 * n
 */
const newConnectionHandler = async(socket,io)=>{

    const userDetails = socket.user;
    serverStore.addNewConnectedUser(
        {
            socketId: socket.id,
            userId : userDetails.userId,
            
        }
    )
}



module.exports = newConnectionHandler;
