const connectedUser = new Map();

/**
 * 
 * @param {socketId, userId} 
 * 
 */
const addNewConnectedUser = ({socketId, userId})=>{
    connectedUser.set(socketId,{userId});

   console.log('The new connected user,:😎',connectedUser);
}
module.exports ={addNewConnectedUser}