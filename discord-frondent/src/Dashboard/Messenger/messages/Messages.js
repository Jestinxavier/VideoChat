import { styled } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import MessageHeader from "./MessageHeader";
import Message from "./Message";

const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
export const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <MainContainer>
      <MessageHeader name={chosenChatDetails?.name} />
      {messages.map((message) => (
        <Message
          key={message._id}
          content={message.content}
          username={message.author.username}
          sameAuthor={message.sameAuthor}
          date={message.date}
          sameDay={message.sameDay}
        />
      ))}
    </MainContainer>
  );
};

const mapStateToProps = ({ chat }) => ({ ...chat });

export default connect(mapStateToProps)(Messages);
