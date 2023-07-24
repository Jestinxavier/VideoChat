import { styled } from "@mui/material";
import React from "react";
import Messages from "./messages/Messages";
import NewMessageInput from "./NewMessageInput";

const Wrapper = styled("div")({
  flexGrow: 1,
});
function MessengerContent({ chosenChartDetails }) {
  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
}

export default MessengerContent;
