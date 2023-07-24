import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import MessengerContent from "./MessengerContent";
import WelcomeMessage from "./WelcomeMessage";

const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  marginTop: "48px",
  display: "flex",
});

const Messenger = ({ chosenChatDetails }) => {
  return <MainContainer>
    {chosenChatDetails?<MessengerContent chosenChatDetails={chosenChatDetails}/>:<WelcomeMessage/>}
  </MainContainer>;
};

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps)(Messenger);
