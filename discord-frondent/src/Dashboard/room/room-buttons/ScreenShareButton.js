import { IconButton } from "@mui/material";
import React, { useState } from "react";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";

function ScreenShareButton() {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const toggleScreenSharing = () =>
    setIsScreenSharingActive(!isScreenSharingActive);
  return (
    <IconButton onClick={toggleScreenSharing} sx={{ color: "white" }}>
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
}

export default ScreenShareButton;
