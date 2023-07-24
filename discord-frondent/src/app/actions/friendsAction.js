import {openAlertMessage} from './alertActions'
import * as api from '../../api'

export const friendsActions = {
  SET_FRIENDS: "FRIENDS.SET_FRIENDS",
  SET_PENING_FRIENDS_INVITATIONS: "FRIENDS.SET_PENING_FRIENDS_INVITATIONS",
  SET_ONLOINE_USERS: "FRIENDS.SET_ONLOINE_USERS",
};

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data, closeDialogHandler) => 
      dispatch(sendFriendInvitation(data, closeDialogHandler)),
      acceptFriendInvitation: (data)=>dispatch(acceptFriendInvitation(data)),
      rejectFriendInvitation: (data)=>dispatch(rejectFriendInvitation(data))
    ,
  };
};

export const setPendingFriendsInvitations = (pendingFriendsInvitaions)=>{
  return {
    type: friendsActions.SET_PENING_FRIENDS_INVITATIONS,
    pendingFriendsInvitaions
    
  }
}
export const setFriends = (friends)=>{
  return {
    type: friendsActions.SET_FRIENDS,
    friends,
  }
}

export const setOnlineUsers = (onlineUsers)=>{
  return {
    type: friendsActions.SET_ONLOINE_USERS,
    onlineUsers,
  }
}

const sendFriendInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const responce = await api.sendFriendInvitation(data);
    if (responce.error) {
      dispatch(openAlertMessage(responce?.exception?.responce?.data));
    } else {
      dispatch(openAlertMessage("Invitation has been sent!"));
      closeDialogHandler();
    }
  };
};

 const acceptFriendInvitation = (data)=>{
return async (dispatch)=>{
  const responce = await api.acceptFriendInvitation(data)
  if (responce.error) {
    dispatch(openAlertMessage(responce?.exception?.responce?.data));
  } else {
    dispatch(openAlertMessage("Invitation accepted!"));
  }
}
}

 const rejectFriendInvitation = (data)=>{
  return async (dispatch)=>{
    const responce = await api.rejectFriendInvitation(data)
    if (responce.error) {
      dispatch(openAlertMessage(responce?.exception?.responce?.data));
    } else {
      dispatch(openAlertMessage("Invitation rejected!"));
    }
  }
}





