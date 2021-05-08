import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router";
import { Loader } from "./modules/shared-components/Loader/Loader.component";

const HomeContainer = lazy(() =>
  import("../src/modules/home/components/Home.container")
);

export const Routes = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route key="pepe" path="/home" component={HomeContainer} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Suspense>
    </>
  );
};
