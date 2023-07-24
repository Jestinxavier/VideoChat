import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../app/actions/friendsAction";
import store from "../app/store";

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
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};
