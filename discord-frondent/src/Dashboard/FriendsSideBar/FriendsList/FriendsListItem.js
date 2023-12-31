import React from "react";
import Button from "@mui/material/Button";
import Avatar from "../../../shared/component/Avatar";
import Typography from "@mui/material/Typography";
import OnlineIndicator from "./OnlineIndicator";
import { chatTypes, getActions } from "../../../app/actions/chatActions";
import { connect } from "react-redux";

const FriendsListItem = ({ id, username, isOnline, setChosenChatDetails }) => {
  const handleChooseActiveConversation = () => {
    console.log("dd");
    setChosenChatDetails({ id, name: username }, chatTypes.DIRECT);
  };
  return (
    <Button
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
      onClick={handleChooseActiveConversation}
    >
      <Avatar username={username} />
      <Typography
        style={{
          marginLeft: "7px",
          fontWeight: 700,
          color: "#8e9297",
        }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

const mapActionsToProps = (dispatch) => ({
  ...getActions(dispatch),
});
export default connect(null, mapActionsToProps)(FriendsListItem);
