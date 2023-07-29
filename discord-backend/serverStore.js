const { v4: uuidv4 } = require("uuid");
const connectedUser = new Map();
let activeRooms = [];

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

const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuidv4(),
  };
  activeRooms = [...activeRooms, newActiveRoom];
  return newActiveRoom;
};

const getActiveRooms = () => {
  return [...activeRooms];
};

const getActiveRoom = (roomId) => {
  return activeRooms.find((room) => room.roomId === roomId) || null;
};

const joinActiveRoom = (roomId, newParticipant) => {
  const room = activeRooms.find((room) => room.roomId === roomId);
  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);
  const updatedRoom = {
    ...room,
    participant: [...room.participants, newParticipant],
  };
  activeRooms.push(updatedRoom);
};

const leaveActiveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);
  if (activeRoom) {
    const copyOfActiveRoom = { ...activeRoom };
    copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
      (participant) => participant.socketId !== participantSocketId
    );

    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);
    if (activeRoom.participants.length > 0) {
      activeRooms.push(copyOfActiveRoom);
    }
  }
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnection,
  getSocketServerInstance,
  setSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms,
  getActiveRoom,
  joinActiveRoom,
  leaveActiveRoom,
};
