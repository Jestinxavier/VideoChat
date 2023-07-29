import { IconButton } from "@mui/material";
import React, { useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

function MicButton({localStream}) {
  const [micEnabled, setMicEnabled] = useState(false);
  const toggleMic = () => {
    localStream.getAudioTracks()[0].enabled=!micEnabled;
     setMicEnabled(!micEnabled);
  };
  return (
    <IconButton onClick={toggleMic} sx={{ color: "white" }}>
      {micEnabled ? <MicIcon /> : <MicOffIcon />}
    </IconButton>
  );
}

export default MicButton;
