const connectedUser = new Map();

let io = null;
const setSocketServerInstance = (ioInstatnce) => {
  io = ioInstatnce;
};

const getSocketServerInstance = () => {
  return io;
};

/**
 *
 * @param {socketId, userId}
 *
 */

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUser.set(socketId, { userId });

  console.log("The new connected user,:😎", connectedUser);
};

const removeConnectedUser = (socketId) => {
  if (connectedUser.has(socketId)) {
    connectedUser.delete(socketId);
    console.log("new Connected user");
    console.log(connectedUser);
  }
};

const getActiveConnection = (userId) => {
  const activeConnection = [];

  connectedUser.forEach(function (value, key) {
    if (value.userId === userId) {
      activeConnection.push(key);
    }
  });

  return activeConnection;
};
const getOnlineUsers = () => {
  const onlineUsers = [];
  connectedUser.forEach(function (value, key) {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });
  return onlineUsers;
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnection,
  getSocketServerInstance,
  setSocketServerInstance,
  getOnlineUsers,
};
