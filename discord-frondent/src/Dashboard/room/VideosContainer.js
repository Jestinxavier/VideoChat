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
function VideosContainer({ localStream }) {
  return (
    <MainContainer>
      <Video stream={localStream} isLocalStream />
    </MainContainer>
  );
}

const mapStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStateToProps)(VideosContainer);
