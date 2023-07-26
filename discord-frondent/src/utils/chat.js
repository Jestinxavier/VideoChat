import { setMessage } from "../app/actions/chatActions";
import store from "../app/store";

export const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;

  const receiverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().auth.userDetails.id;
  if (receiverId && userId) {
    const usersInconversation = [receiverId, userId];
    updateChatHistoryIfSameConversationactive({
        participants,
        usersInconversation,
        messages
    })
  }
};

const updateChatHistoryIfSameConversationactive = ({participants,usersInconversation,messages}) => {
    const result=participants.every(participantId => usersInconversation.includes(participantId));
    if(result){
        store.dispatch(setMessage(messages));
    }
}
