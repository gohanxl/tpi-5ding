import React from "react";
import { Routes } from "./App.routes";
import "./App.styles.scss";

export const App = () => {
  return (
    <div>
      <div className="app-wrapper">
        <div className="app">
          <Routes />
        </div>
      </div>
    </div>
  );
};
