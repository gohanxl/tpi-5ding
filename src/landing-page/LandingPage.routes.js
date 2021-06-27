import React from "react";
import { Route, Switch } from "react-router";
import { Home } from "./modules/home-page/Home.component.js";

export const LandingPageRoutes = () => {
  return (
    <Switch>
      <Route key="landing-page" path="/" component={Home} />
    </Switch>
  );
};
