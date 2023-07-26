const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const serverStore = require("./serverStore");
const { updateFriends } = require("./socketHandlers/updates/friends");
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const roomCreatehandler = require("./socketHandlers/roomCreatehandler");
const roomJoinhandler = require("./socketHandlers/roomJoinHandler");
const roomLeaveHandler = require("./socketHandlers/roomLeaveHandler");
const registSockServer = (sever) => {
  const io = require("socket.io")(sever, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    // validation wheather the email is already exist.
    authSocket(socket, next);
  });
  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-user", { onlineUsers });
  };
  // when it is successfull we can connect the connectin
  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);
    // new connection handler
    newConnectionHandler(socket, io);
    emitOnlineUsers();
    // updateFriends(socket.user.userId);
    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });

    socket.on('direct-chat-history', (data) => {
        directChatHistoryHandler(socket, data)
    })
    socket.on("room-create",()=>{
      roomCreatehandler(socket)
    })

    socket.on("room-join", (data) => {
      roomJoinhandler(socket, data);
    })

    socket.on("room-leave", (data) => {
      roomLeaveHandler(socket, data);
    })

    socket.on("disconnect", () => {
      console.log("disconnect Socket server");
      disconnectHandler(socket);
    });
  });
  setInterval(() => {
    emitOnlineUsers();
  }, 1000 * 8);
};

module.exports = { registSockServer };
