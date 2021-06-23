import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router";
import { Loader } from "./main-app/modules/shared-components/Loader/Loader.component";
import { ComingSoonComponent } from "./main-app/views/ComingSoon/ComingSoon.component";

const LandingPageComponent = lazy(() =>
  import("./landing-page/LandingPage.component")
);
const MainAppComponent = lazy(() => import("./main-app/App.main.component"));

export const Routes = () => {
  if (screen.width <= 0) {
    return <ComingSoonComponent />;
  }
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

          <Redirect exact from="/educapp" to="/educapp/home" />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Suspense>
    </>
  );
};
