import { setLocalStream } from "../app/actions/roomActions";
import store from "../app/store";
import Peer from "simple-peer";

const getConfiguration = () => {
    const  turnIceServers=null
    if(turnIceServers) {

    }else{
        return {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
            ],
        };
    }
}
const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  audio: true,
  video: true,
};

export const getLocalStreamPreview = (onlyAudio = false, callback) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
  navigator.mediaDevices
    ?.getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
    })
    .catch((err) => {
      console.log(err);
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream;
  if (isInitiator) {
  }
  peers[connUserSocketId] = new Peer({
    initiator:isInitiator,
    config:getConfiguration(),
    stream: localStream,
  });
};
