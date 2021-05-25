import React, { useEffect } from "react";
import { Routes } from "./App.routes";
import "./App.styles.scss";
import { useAuth0 } from "@auth0/auth0-react";
import loading from "./loading.svg";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./main-app/modules/user/store/user.actions";
import { userService } from "./main-app/modules/user/api/usuario-service";

const Loading = () => (
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

export const App = () => {
  const dispatch = useDispatch();
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    error,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => {
          userService
            .getUserByEmail(token, user.email)
            .then((res) => {
              dispatch(
                setCurrentUser({
                  token,
                  metadata: user,
                  dbUser: res.data.Usuario,
                })
              );
            })
            .catch((err) => {
              console.log(err);
              dispatch(
                setCurrentUser({
                  token,
                  metadata: user,
                })
              );
            });
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, getAccessTokenSilently, isAuthenticated, user]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const isLandingPage = !window.location.hash.includes("educapp");
  //TODO remove href must work as SPA
  return (
    <div>
      {!isLandingPage && (
        <header>
          <nav
            className="navbar is-info"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <a className="navbar-item" href="/home">
                <img
                  src="https://bulma.io/images/bulma-logo.png"
                  alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
                  width="112"
                  height="28"
                />
              </a>
              {isAuthenticated && (
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log Out
                </button>
              )}
            </div>
          </nav>
        </header>
      )}
      <div className="App">
        <div>
          {isAuthenticated && <Routes />}
          {!isAuthenticated && loginWithRedirect()}
        </div>
      </div>
    </div>
  );
};
