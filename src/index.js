import React from "react";
import App from "./App";
import "./index.css";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureAppStore } from "./App.store";
import reportWebVitals from "./reportWebVitals";

const store = configureAppStore();

const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
