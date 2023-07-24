import { styled } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { sendDirectMessage } from "../../realtimeCommunication/SocketConnection";

const MainContainer = styled("div")(({ theme }) => ({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Input = styled("input")(({ theme }) => ({
  width: "98%",
  height: "44px",
  border: "none",
  color: "white",
  backgroundColor: "#2f3236",
  borderRadius: "8px",
  fontSize: "14px",
  padding: "0 10px",
}));

function NewMessageInput({ chosenChatDetails }) {
  const [message, setMessage] = useState("");
  const handleMessageSend = () => {
    console.log("message",message);
    if(message.length > 0){
        sendDirectMessage({
            receiverUserId: chosenChatDetails?.id,
            content:message
        })
    }
    setMessage("");
  };
  return (
    <MainContainer>
      <Input
        placeholder={`Write message to ${chosenChatDetails?.name}`}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleMessageSend();
          }
        }}
      />
    </MainContainer>
  );
}

const mapStateToProps = ({ chat }) => {
  return { ...chat };
};

export default connect(mapStateToProps)(NewMessageInput);
