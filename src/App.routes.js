import React from "react";
import { Route, Switch } from "react-router";
import { Home } from "./modules/home-page/Home.component.js";

export const Routes = () => {
  return (
    <Switch>
      <Route key="landing" path="/" component={Home} />
    </Switch>
  );
};
