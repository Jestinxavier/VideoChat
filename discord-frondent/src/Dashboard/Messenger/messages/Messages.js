import { styled } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import MessageHeader from "./MessageHeader";
import Message from "./Message";
import { getDirectChatHistory } from "../../../realtimeCommunication/SocketConnection";
import DateSeperator from "./DateSeperator";

const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
};
export const Messages = ({ chosenChatDetails, messages }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);
  return (
    <MainContainer>
      <MessageHeader name={chosenChatDetails?.name} />
      {messages.map((message, i) => {
        const sameAuthor =
          i > 0 && messages[i].author._id === messages[i - 1].author._id;
        const sameDay =
          i > 0 &&
          convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") ===
            convertDateToHumanReadable(
              new Date(messages[i - 1].date),
              "dd/mm/yy"
            );
        return (
          <div key={i} style={{ width: "97%" }}>
            {!sameDay ||
              (i === 0 && (
                <DateSeperator
                  date={convertDateToHumanReadable(
                    new Date(message.date),
                    "dd/mm/yy"
                  )}
                />
              ))}
            <Message
              key={message._id}
              content={message.content}
              username={message.author.username}
              sameAuthor={sameAuthor}
              date={convertDateToHumanReadable(
                new Date(message.date),
                "dd/mm/yy"
              )}
              sameDay={sameDay}
            />
          </div>
        );
      })}
    </MainContainer>
  );
};

const mapStateToProps = ({ chat }) => ({ ...chat });

export default connect(mapStateToProps)(Messages);
