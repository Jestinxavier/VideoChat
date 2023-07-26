import { Button, Tooltip } from "@mui/material";
import React from "react";
import Avatar from "../../shared/component/Avatar"
import * as roomHandler from "../../realtimeCommunication/roomHandler"

function ActiveRoomButton({
  creatorUserName,
  roomId,
  amountOfparticipants,
  isUserInRoom,
}) {
  const handleJoinRoom = () => {
    if (amountOfparticipants < 4) {
      roomHandler.joinRoom(roomId)
    }
  };

  const activeRoomButtonDisabled = amountOfparticipants > 3;
  const roomTitle = `Creator: ${creatorUserName}. Connected: ${amountOfparticipants}`;
  return (
    <Tooltip title={roomTitle}>
      <span>
      <Button disabled={activeRoomButtonDisabled || isUserInRoom}
      onClick={handleJoinRoom}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        backgroundColor: "#5865F2",
      }}
      >
        <Avatar username={creatorUserName} />
      </Button>
      </span>
    </Tooltip>
  );
}

export default ActiveRoomButton;
