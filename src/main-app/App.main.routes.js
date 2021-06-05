import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router";
import { routes } from "../App.constants";
// import { NotFound } from "./modules/shared-components/NotFound/NotFound.component";

const HomeContainer = lazy(() =>
  import("./modules/home/components/Home.container")
);

export const MainAppRoutes = ({ routesRoleConfig, currentRole }) => {
  const formattedCurrentRole = currentRole && currentRole[0].toLowerCase();
  return (
    <Switch>
      {routesRoleConfig.map((routeProps) => (
        <Route key={routeProps.path} {...routeProps} />
      ))}
      <Route
        key="dashboard"
        path={routes.dashboard(formattedCurrentRole)}
        component={HomeContainer}
      />
      <Redirect
        to={routes.dashboard(formattedCurrentRole)}
        component={HomeContainer}
      />
    </Switch>
  );
};
