import React from "react";
import { Sidebar } from "./modules/shared-components/Sidebar/Sidebar.component";
import { MainAppRoutes } from "./App.main.routes";

const MainApp = () => {
  return (
    <div className="App is-flex">
      <div>
        <Sidebar />
      </div>
      <div className="app-container">
        <div className="app-content is-flex">
          <MainAppRoutes />
        </div>
        <footer className="footer">
          <p className="has-text-centered">
            Created by <b>5ding</b>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MainApp;
