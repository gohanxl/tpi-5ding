import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { userReducer } from "./main-app/modules/user/store/user.reducer";
import { videoReducer } from "./main-app/modules/videocall/video-chat/store/video.reducer";

export const createRootReducer = (history) =>
  combineReducers({
    user: userReducer,
    video: videoReducer,
    router: connectRouter(history),
  });
