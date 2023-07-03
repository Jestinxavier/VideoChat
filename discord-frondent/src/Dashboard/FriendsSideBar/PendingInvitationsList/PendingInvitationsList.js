import React from "react";
import { styled } from "@mui/system";
import PendingInvitationsListItem from "./PendingInvitationsListItem";
import {connect} from 'react-redux'

// const DUMMY_INVITATIONS = [
//   {
//     _id: "1",
//     senderId: {
//       username: "Mark",
//       mail: "dummy@ad.com",
//     },
//   },
//   {
//     _id: "2",
//     senderId: {
//       username: "John",
//       mail: "John@ad.com",
//     },
//   },
// ];

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

const PendingInvitationsList = ({pendingFriendsInvitaions}) => {
  console.log(pendingFriendsInvitaions,"pendingFriendsInvitaions");
  return (
    <MainContainer>
      {pendingFriendsInvitaions?.map((invitation) => (
        
        <PendingInvitationsListItem
          key={invitation._id}
          id={invitation._id}
          username={invitation.senderId.username}
          mail={invitation.senderId.mail}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps  = ({friends})=>{
  return { ...friends}
}
export default connect(mapStoreStateToProps)(PendingInvitationsList);
