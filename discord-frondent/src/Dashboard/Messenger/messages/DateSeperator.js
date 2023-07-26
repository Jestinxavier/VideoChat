import { styled } from "@mui/material";
import React from "react";

const Seperator = styled("div")({
  width: "95%",
  height: "1px",
  backgroundColor: "#b9bbbe",
  position: "relative",
  marginTop: "20px",
  marginBottom: "10px",
});

const DateLabel = styled("span")({
  backgroundColor: "#36393f",
  position: "absolute",
  left: "45%",
  top: "-10px",
  color: "#b9bbbe",
  padding: "0 5px",
  fontSize: "14px",
});

function DateSeperator({ date }) {
  return (
    <Seperator>
      <DateLabel>{date}</DateLabel>
    </Seperator>
  );
}

export default DateSeperator;
