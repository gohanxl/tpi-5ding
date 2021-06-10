/* eslint-disable no-constant-condition */
import React, { useEffect, useState } from "react";
import { Sidebar } from "./modules/shared-components/Sidebar/Sidebar.component";
import { MainAppRoutes } from "./App.main.routes";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../main-app/modules/user/store/user.actions";
import { userService } from "../main-app/modules/user/api/usuario-service";
import educAppWhiteLogo from "../assets/img/logo-white.svg";
import educAppLogo from "../assets/img/logo.svg";
import { Loader } from "./modules/ui-styling/components/Loader/Loader.component";
import { spinning_svg } from "./App.main.module.scss";

const MainApp = () => {
  const dispatch = useDispatch();
  const [hideFooter, setHideFooter] = useState(true);
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
              console.error(err);
              dispatch(
                setCurrentUser({
                  token,
                  metadata: user,
                })
              );
            });
        })
        .catch((err) => console.error(err));
    }
  }, [dispatch, getAccessTokenSilently, isAuthenticated, user]);

  useEffect(() => {
    setHideFooter(
      window.location.hash == "#/educapp/home" ||
        window.location.hash == "#/educapp/teacher/call"
    );
  }, []);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <div className={isLoading ? spinning_svg : ""}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <nav
              className="educapp-nav navbar"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <a className="navbar-item" href="#/educapp/home">
                  <img
                    src={educAppWhiteLogo}
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
            <div
              className={"app-container" + (!hideFooter ? "" : " hide-footer")}
            >
              <div className="app-content">
                {isAuthenticated && <MainAppRoutes />}
                {!isAuthenticated && loginWithRedirect()}
              </div>
              <footer className="footer">
                <p className="has-text-centered">
                  <span>Powered by</span>
                  <img
                    src={educAppLogo}
                    className="mx-2 mb-1"
                    alt="Educapp logo"
                    width="20"
                  />
                  <b>EducApp</b>
                </p>
              </footer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainApp;
