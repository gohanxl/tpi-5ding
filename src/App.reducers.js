import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { homeReducer } from "./modules/home/store/home.reducer";
import { userReducer } from "./redux/reducers/user.reducer";

export const createRootReducer = (history) =>
  combineReducers({
    home: homeReducer,
    user: userReducer,
    router: connectRouter(history),
  });
