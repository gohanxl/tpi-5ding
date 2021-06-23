import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router";
import { roles, routes } from "../App.constants";

const HomeContainer = lazy(() =>
  import("./modules/home/components/Home.container")
);

export const MainAppRoutes = ({ routesRoleConfig, currentRole }) => {
  const isAdmin = currentRole === roles.ADMIN;
  const dashboardRoute = routes.dashboard(
    isAdmin ? roles.TEACHER : currentRole
  );
  return (
    <Switch>
      {routesRoleConfig.map((routeProps) => (
        <Route key={routeProps.path} {...routeProps} />
      ))}
      <Route key="dashboard" path={dashboardRoute} component={HomeContainer} />
      <Redirect exact from="/#/educapp" to={dashboardRoute} />
      <Redirect to={dashboardRoute} component={HomeContainer} />
    </Switch>
  );
};
