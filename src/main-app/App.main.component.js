import React from "react";
import { Sidebar } from "./modules/shared-components/Sidebar/Sidebar.component";
import { MainAppRoutes } from "./App.main.routes";

const MainApp = () => {
  return (
    <>
      <Sidebar />
      <MainAppRoutes />
    </>
  );
};

export default MainApp;
