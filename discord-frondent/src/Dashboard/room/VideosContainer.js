import { styled } from "@mui/material";
import React from "react";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});
function VideosContainer() {
  return <MainContainer>VideoContainer</MainContainer>;
}

export default VideosContainer;
