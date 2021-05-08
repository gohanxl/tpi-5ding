import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router";

const HomeContainer = lazy(() => import('../src/modules/home/components/Home.container'));

export const Routes = () => {
  return (
    <>
      <Suspense>
        <Switch>
          <Route key="pepe" path="/home" component={HomeContainer} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Suspense>
    </>
  );
};
