import { styled } from "@mui/material";
import React, { useState } from "react";
import ResizeRoomButton from "./ResizeRoomButton";
import VideosContainer from "./VideosContainer";
import RoomButtons from "./room-buttons/RoomButtons";

const MainContainer = styled("div")({
  position: "absolute",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#202225",
});

const fullScreenRoomStyle = {
  width: "100%",
  height: "100vh",
};

const minimizedRoomStyle = {
  bottom: "0px",
  right: "0px",
  width: "30%",
  height: "40vh",
};

function Room() {
  const [isRoomMinimized, setIsRoomMinimized] = useState(false);
  const handleResizeRoom = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };
  return (
    <MainContainer
      style={isRoomMinimized ? minimizedRoomStyle : fullScreenRoomStyle}
    >
        <VideosContainer/>
        <RoomButtons/>
      <ResizeRoomButton
        isRoomMinimized={isRoomMinimized}
        handleRoomResize={handleResizeRoom}
      />
    </MainContainer>
  );
}

export default Room;
