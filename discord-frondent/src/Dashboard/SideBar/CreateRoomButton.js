import { Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { createNewRoom } from "../../realtimeCommunication/roomHandler";

function CreateRoomButton({isUserInRoom}) {
  const handleCreateNewRoom = () => {createNewRoom()};
  return (
    <Button
    disabled={isUserInRoom}
      onClick={handleCreateNewRoom}
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
      <AddIcon />
    </Button>
  );
}

export default CreateRoomButton;
