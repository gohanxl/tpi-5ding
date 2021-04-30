import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { homeReducer } from "./modules/home/store/home.reducer";

export function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: {
      home: homeReducer,
    },
    middleware: [thunk, logger],
    preloadedState,
  });

  return store;
}
