import React from "react";
import "./index.css";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { configureAppStore } from "./App.store";
//import { ConnectedRouter } from "connected-react-router";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

import { App } from "./App";
import { HashRouter } from "react-router-dom";
import { env_config } from "./config/env-config";

const store = configureAppStore();
const browserHistory = createBrowserHistory();

const onRedirectCallback = (appState) => {
  browserHistory.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const providerConfig = {
  ...env_config,
  scope: "ADMIN Director Student Teacher",
  onRedirectCallback,
};

const renderApp = () =>
  render(
    <Auth0Provider {...providerConfig}>
      <Provider store={store}>
        <HashRouter history={browserHistory}>
          <App />
        </HashRouter>
      </Provider>
    </Auth0Provider>,
    document.getElementById("root")
  );

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
