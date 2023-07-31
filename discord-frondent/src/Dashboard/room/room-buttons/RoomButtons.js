import { styled } from "@mui/material";
import React from "react";
import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton";
import { connect } from "react-redux";
import { getActions } from "../../../app/actions/roomActions";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
function RoomButtons(props) {
  const { localStream, isUserJoinedWithOnlyAudio } = props;
  return (
    <MainContainer>
      {!isUserJoinedWithOnlyAudio && <ScreenShareButton {...props} />}
      <MicButton localStream={localStream} />
      <CloseRoomButton />
      {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} />}
    </MainContainer>
  );
}

const mapStateToProps = ({ room }) => {
  return { ...room };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(RoomButtons);
