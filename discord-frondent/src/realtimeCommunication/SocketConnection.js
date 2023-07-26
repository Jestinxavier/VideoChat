import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../app/actions/friendsAction";
import store from "../app/store";
import { updateDirectChatHistoryIfActive } from "../utils/chat";
import {newRoomCreated, updateActiveRooms} from "./roomHandler"

let socket = null;
export const connectionWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io("http://localhost:5000", {
    auth: {
      tocken: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log("Socket connected 🫨");
    console.log(socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on("online-users", ({ onlineUsers }) => {
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("online-user", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
    console.log("online user update came");
  });

  socket.on("direct-chat-history", (data) => {
    updateDirectChatHistoryIfActive(data);
  });

  socket.on("room-create", (data) => {
    console.log(data, "data");
    newRoomCreated(data);
  });

  socket.on("active-rooms",data => {
    updateActiveRooms(data);
  })
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};

export const createNewRoom = () => {
  socket.emit("room-create");
};

export const joinRoom=(data) => {
  socket.emit("room-join", data)
}

export const leaveRoom=(data) => {
  socket.emit("room-leave", data)
}
