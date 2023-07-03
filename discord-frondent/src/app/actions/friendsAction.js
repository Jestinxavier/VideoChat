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
      rejuctFriendInvitation: (data)=>dispatch(rejuctFriendInvitation(data))
    ,
  };
};

export const setPendingFriendsInvitations = (pendingFriendsInvitaions)=>{
  return {
    type: friendsActions.SET_PENING_FRIENDS_INVITATIONS,
    pendingFriendsInvitaions
    
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

 const rejuctFriendInvitation = (data)=>{
  return async (dispatch)=>{
    const responce = await api.rejuctFriendInvitation(data)
    if (responce.error) {
      dispatch(openAlertMessage(responce?.exception?.responce?.data));
    } else {
      dispatch(openAlertMessage("Invitation rejucted!"));
    }
  }
}


