import { IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as roomHandler from  "../../../realtimeCommunication/roomHandler"

function CloseRoomButton() {
  const handleLeaveRoom = () => {
    roomHandler.leaveRoom();
  };
  return <IconButton onClick={handleLeaveRoom} style={{color:'white'}}><CloseIcon/></IconButton>;
}

export default CloseRoomButton;
