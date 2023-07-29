import { styled } from "@mui/material";
import React, { useEffect, useRef } from "react";

const MainContainer = styled("div")({
  height: "50%",
  width: "50%",
  backgroundColor: "black",
  borderRadius: "8px",
});

const VideoEl = styled("video")({
  height: "100%",
  width: "100%",
});

function Video({ stream, isLocalStream }) {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);
  return (
    <MainContainer>
      <VideoEl ref={videoRef} autoPlay muted={isLocalStream} />
    </MainContainer>
  );
}

export default Video;
