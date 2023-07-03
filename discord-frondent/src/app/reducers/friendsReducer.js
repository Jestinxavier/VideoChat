import { friendsActions } from "../actions/friendsAction";

const initialState = {
  friends: [],
  pendingFriendsInvitaions: [],
  onlineUsers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case friendsActions.SET_PENING_FRIENDS_INVITATIONS:
      return {
        ...state,
        pendingFriendsInvitaions: action.pendingFriendsInvitaions,
      };
    case friendsActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case friendsActions.SET_ONLOINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
      default:
        return state;
  }
};

export default reducer;
