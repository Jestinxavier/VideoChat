import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "../utils/auth";
import { connect } from "react-redux";
import { getActions,setUserDetails } from "../app/actions/authAction";
import { connectionWithSocketServer } from "../realtimeCommunication/SocketConnection";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = () => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else { 
      
      setUserDetails(JSON.parse(userDetails));
      connectionWithSocketServer(JSON.parse(userDetails))
    }
  }, []);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Dashboard);
