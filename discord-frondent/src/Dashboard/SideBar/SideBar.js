import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import { connect } from "react-redux";
import ActiveRoomButton from "./ActiveRoomButton";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

const SideBar = ({ activeRooms, isUserInRoom }) => {
  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton isUserInRoom={isUserInRoom}/>
      {activeRooms.map((room) => {
        console.log(room);
        return (
          <ActiveRoomButton
            roomId={room.roomId}
            creatorUserName={room.creatorUserName}
            amountOfparticipants={room.participants.length}
            key={room.roomId}
            isUserInRoom={isUserInRoom} />
        );
      })}
    </MainContainer>
  );
};

const mapStateToProps = ({ room }) => {
  return { ...room };
};

export default connect(mapStateToProps)(SideBar);
