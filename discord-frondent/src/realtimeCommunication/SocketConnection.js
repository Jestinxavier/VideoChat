import io from "socket.io-client";
import { setPendingFriendsInvitations,setFriends } from "../app/actions/friendsAction";
import store from "../app/store";

export const connectionWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  let socket = io("http://localhost:5000", {
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
const {friends} = data;
store.dispatch(setFriends(friends))
  });
};
