import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router";
import { NotFound } from "./modules/shared-components/NotFound/NotFound.component";

const HomeContainer = lazy(() =>
  import("./modules/home/components/Home.container")
);

export const MainAppRoutes = ({ routesRoleConfig }) => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      {routesRoleConfig.map((routeProps) => (
        <Route key={routeProps.path} {...routeProps} />
      ))}
      <Route key="pepe" path="/educapp/home" component={HomeContainer} />
      <Route component={NotFound} />
    </Switch>
  );
};
