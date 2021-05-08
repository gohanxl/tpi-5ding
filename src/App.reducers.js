import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { homeReducer } from "./modules/home/store/home.reducer";

export const createRootReducer = (history) =>
  combineReducers({
    home: homeReducer,
    router: connectRouter(history),
  });
