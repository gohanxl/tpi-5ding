import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { roles, routes } from "../App.constants";
import { UnderConstruction } from "./views/under-construction/UnderConstruction.component";

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
      <Route
        key="under-construction"
        path={routes.underConstruction}
        exact
        component={UnderConstruction}
      />
      <Redirect exact from="*" to={dashboardRoute} />
    </Switch>
  );
};
