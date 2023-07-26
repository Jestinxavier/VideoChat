import { composeWithDevTools } from "redux-devtools-extension";
import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import alertReducer from "./reducers/alertReducer";
import authReducer from "./reducers/authReducer";
import chatReducer from "./reducers/chatReducers";
import roomReducer from "./reducers/roomReducer";

import friendsReducer from "./reducers/friendsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer,
  chat: chatReducer,
  room: roomReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
