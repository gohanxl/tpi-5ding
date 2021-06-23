import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router";
import { roles, routes } from "./App.constants";
import { Loader } from "./main-app/modules/shared-components/Loader/Loader.component";
import { ComingSoonComponent } from "./main-app/views/ComingSoon/ComingSoon.component";

const LandingPageComponent = lazy(() =>
  import("./landing-page/LandingPage.component")
);
const MainAppComponent = lazy(() => import("./main-app/App.main.component"));

export const Routes = () => {
  const { landingPage, mainApp, dashboard } = routes;
  const educappRedirectURL = dashboard(roles.TEACHER);

  if (screen.width <= 800) {
    return <ComingSoonComponent />;
  }
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            key="landing-page"
            path={landingPage}
            exact
            component={LandingPageComponent}
          />

          <Route key="main-app" path={mainApp} component={MainAppComponent} />

          <Redirect exact from="/educapp" to={educappRedirectURL} />
        </Switch>
      </Suspense>
    </>
  );
};
