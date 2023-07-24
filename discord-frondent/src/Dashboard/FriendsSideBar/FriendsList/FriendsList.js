import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { connect } from "react-redux";

// const DUMMY_FRIENDS = [
//   {
//     id: 1,
//     username: "Devika",
//     isOnline: true,
//   },
//   {
//     id: 2,
//     username: "Vipin",
//     isOnline: false,
//   },
//   {
//     id: 3,
//     username: "Gokul",
//     isOnline: false,
//   },
//   {
//     id: 4,
//     username: "shelly pappen",
//     isOnline: true,
//   },
//   {
//     id: 4,
//     username: "sruth chechi",
//     isOnline: true,
//   },

// ];

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  friends.forEach((f) => {
    const isUserOnline = onlineUsers.find((u) => u.userId === f.id);
    f.isOnline = isUserOnline ? true : false;
  });
  return friends;
};

const FriendsList = ({ friends, onlineUsers }) => {
  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStoreStateToProps)(FriendsList);
