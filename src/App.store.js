import logger from "redux-logger";
import thunk from "redux-thunk";
import { createRootReducer } from './App.reducers'
import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export function configureAppStore(preloadedState = {}) {
  const browserHistory = createBrowserHistory();
  const store = configureStore({
    reducer: createRootReducer(browserHistory),
    middleware: [thunk, logger, routerMiddleware(browserHistory)],
    preloadedState,
  });

  return store;
}
