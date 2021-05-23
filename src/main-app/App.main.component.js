import React from "react";
import { Sidebar } from "./modules/shared-components/Sidebar/Sidebar.component";
import { MainAppRoutes } from "./App.main.routes";

const MainApp = () => {
  //TODO remove href must work as SPA
  return (
    <div>
      <Sidebar />
      <MainAppRoutes />
    </div>
  );
};

export default MainApp;
