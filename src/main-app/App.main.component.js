import React, { useEffect } from "react";
import { Sidebar } from "./modules/shared-components/Sidebar/Sidebar.component";
import { MainAppRoutes } from "./App.main.routes";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../main-app/modules/user/store/user.actions";
import { userService } from "../main-app/modules/user/api/usuario-service";
import loading from "../loading.svg";
import educAppLogo from "../assets/img/logo-white.svg";

const Loading = () => (
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

const MainApp = () => {
  const dispatch = useDispatch();
  const {
    user,
    isAuthenticated,
    error,
    isLoading,
    loginWithRedirect,
    logout,
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

  return (
    <div>
      <header>
        <nav
          className="educapp-nav navbar is-info"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item" href="/home">
              <img
                src={educAppLogo}
                alt="Educapp logo"
                width="30"
                height="30"
              />
            </a>
            {isAuthenticated && (
              <button
                className="button is-warning"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </button>
            )}
          </div>
        </nav>
      </header>
      <div className="App is-flex">
        <div>
          <Sidebar />
        </div>
        <div className="app-container">
          <div className="app-content is-flex">
            {isAuthenticated && <MainAppRoutes />}
            {!isAuthenticated && loginWithRedirect()}
          </div>
          <footer className="footer">
            <p className="has-text-centered">
              Created by <b>5ding</b>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
