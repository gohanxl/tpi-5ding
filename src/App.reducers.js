import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { homeReducer } from "./main-app/modules/home/store/home.reducer";
import { userReducer } from "./main-app/modules/user/store/user.reducer";
import { videoReducer } from "./main-app/modules/videocall/video-chat/store/video.reducer";

export const createRootReducer = (history) =>
  combineReducers({
    home: homeReducer,
    user: userReducer,
    video: videoReducer,
    router: connectRouter(history),
  });
