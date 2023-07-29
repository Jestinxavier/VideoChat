import { IconButton } from "@mui/material";
import React, { useState } from "react";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import * as webRTCHandler from "../../../realtimeCommunication/webRtcHandler";

const constraints = {
  audio: false,
  video: true,
};

function ScreenShareButton({
  localStream,
  screenSharingStream,
  setScreenShareStream,
  isScreenSharingActive,
}) {
  const toggleScreenSharing = async () => {
    if (isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (e) {
        console.log(e);
      }
      if (stream) {
        setScreenShareStream(stream);
        webRTCHandler.switchOutgoingTracks(stream);
      }
    } else {
      webRTCHandler.switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((track) => track.stop());
      setScreenShareStream(null);
    }
  };
  return (
    <IconButton onClick={toggleScreenSharing} sx={{ color: "white" }}>
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
}

export default ScreenShareButton;
