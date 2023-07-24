import { Typography, styled } from "@mui/material";
import React from "react";

const Wrapper = styled("div")({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
function WelcomeMessage() {
  return (
    <Wrapper>
      <Typography variant="h6" sx={{ color: "white" }}>
        To start chatting - choose conversation
      </Typography>
    </Wrapper>
  );
}

export default WelcomeMessage;
