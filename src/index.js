import React from "react";
import "./index.css";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { configureAppStore } from "./App.store";
import { ConnectedRouter } from "connected-react-router";
import reportWebVitals from "./reportWebVitals";

import { App } from "./App";

const store = configureAppStore();
const browserHistory = createBrowserHistory();

const renderApp = () =>
  render(
    <Provider store={store}>
      <ConnectedRouter history={browserHistory}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  );

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
