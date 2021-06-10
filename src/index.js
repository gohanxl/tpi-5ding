import React from "react";
import "./index.css";
import { render } from "react-dom";
import { createBrowserHistory } from "history";
import reportWebVitals from "./reportWebVitals";

import { App } from "./App.component";
import { HashRouter } from "react-router-dom";

const browserHistory = createBrowserHistory();

const renderApp = () =>
  render(
    <HashRouter history={browserHistory}>
      <App />
    </HashRouter>,
    document.getElementById("root")
  );

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
