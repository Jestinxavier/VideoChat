import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenShareStream,
  setIsUserJoinedWithAudio,
} from "../app/actions/roomActions";
import store from "../app/store";
import * as socketConnections from "./SocketConnection";
import * as webRtcHandler from "./webRtcHandler";

export const createNewRoom = () => {
  const successCallback = () => {
    console.log('succeess');
    store.dispatch(setOpenRoom(true, true));

    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedWithAudio(audioOnly));
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

  const userId = store.getState().auth.userDetails?._id;
  activeRooms.forEach((room) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      rooms.push({ ...room, createUsername: "Me" });
    } else {
      friends.forEach((f) => {
        if (f.id === room.roomCreator.userId) {
          rooms.push({ ...room, creatorUserName: f.username });
        }
      });
    }
  });
  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  const successCallback = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    socketConnections.joinRoom({ roomId });
  };
  const audioOnly = store.getState().room.audioOnly;
  webRtcHandler.getLocalStreamPreview(audioOnly, successCallback);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;

  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  const screenShareStream = store.getState().room.screenSharingStream;

  if (screenShareStream) {
    screenShareStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenShareStream(null));
  }

  store.dispatch(setRemoteStreams([]));
  webRtcHandler.closeAllConnections();

  socketConnections.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
