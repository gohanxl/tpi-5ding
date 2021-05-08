import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router";
import { Loader } from "./modules/shared-components/Loader/Loader.component";

import { studentRoutes } from "./views/student/student.routes";
import { teacherRoutes } from "./views/teacher/teacher.routes";

const HomeContainer = lazy(() =>
  import("../src/modules/home/components/Home.container")
);

export const Routes = () => {
  const routes = [...studentRoutes, ...teacherRoutes];
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Redirect exact from="/" to="/home" />
          {routes.map((routeProps) => (
            <Route key={routeProps.path} {...routeProps} />
          ))}
          <Route key="pepe" path="/home" component={HomeContainer} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Suspense>
    </>
  );
};
