import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router";
import { Loader } from "./main-app/modules/shared-components/Loader/Loader.component";

const LandingPageComponent = lazy(() =>
  import("./landing-page/LandingPage.component")
);
const MainAppComponent = lazy(() => import("./main-app/App.main.component"));

export const Routes = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            key="landing-page"
            path="/"
            exact
            component={LandingPageComponent}
          />

          <Route
            key="main-app"
            path={"/educapp/**"}
            component={MainAppComponent}
          />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Suspense>
    </>
  );
};
