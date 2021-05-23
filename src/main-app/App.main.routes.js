import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router";

import { studentRoutes } from "./views/student/student.routes";
import { teacherRoutes } from "./views/teacher/teacher.routes";

const HomeContainer = lazy(() =>
  import("./modules/home/components/Home.container")
);

export const MainAppRoutes = () => {
  const routes = [...studentRoutes, ...teacherRoutes];
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      {routes.map((routeProps) => (
        <Route key={routeProps.path} {...routeProps} />
      ))}
      <Route key="pepe" path="/home" component={HomeContainer} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
};
