import { styled } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import Video from "./Video";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});
function VideosContainer({ localStream, remoteStreams, screenSharingStream }) {
  console.log(localStream,'llll');
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((stream, i) => (
        <Video stream={stream} key={i} />
      ))}
    </MainContainer>
  );
}

const mapStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStateToProps)(VideosContainer);
