import { Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

function ChoosenOptionLabel({ name }) {
  return (
    <Typography
      sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}
    >{`${name ?? ""}`}</Typography>
  );
}

const mapStateToProps = (state) => {
  return {
    name: state.chat.chosenChatDetails?.name,
  };
};
export default connect(mapStateToProps)(ChoosenOptionLabel);
