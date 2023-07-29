import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
} from "../app/actions/roomActions";
import store from "../app/store";
import * as socketConnections from "./SocketConnection";
import * as webRtcHandler from "./webRtcHandler";

export const createNewRoom = () => {
  const successCallback = () => {
    store.dispatch(setOpenRoom(true, true));
    socketConnections.createNewRoom();
  };
  webRtcHandler.getLocalStreamPreview(false, successCallback);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
  const friends = store.getState().friends.friends;

  const rooms = [];
  activeRooms.forEach((room) => {
    friends.forEach((f) => {
      if (f.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUserName: f.username });
      }
    });
  });
  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  const successCallback = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    socketConnections.joinRoom({ roomId });
  };
  const audioOnly =store.getState().room.audioOnly;
  webRtcHandler.getLocalStreamPreview(audioOnly, successCallback);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;

  const localStream=store.getState().room.localStream
  if(localStream){
    localStream.getTracks().forEach(track => track.stop());
    store.dispatch(setLocalStream(null)); 
  }

  socketConnections.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
