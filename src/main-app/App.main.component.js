/* eslint-disable */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar } from "./modules/shared-components/Sidebar/Sidebar.component";
import { MainAppRoutes } from "./App.main.routes";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../main-app/modules/user/store/user.actions";
import { userService } from "../main-app/modules/user/api/usuario-service";
import { studentRoutes } from "./views/student/student.routes";
import { teacherRoutes } from "./views/teacher/teacher.routes";
import { roleAccessibilty } from "./modules/auth/service/roles.service";
import { rolesUrl } from "./modules/user/constants/user.constants";
import educAppWhiteLogo from "../assets/img/logo-white.svg";
import educAppLogo from "../assets/img/logo.svg";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "./modules/ui-styling/components/Loader/Loader.component";
import { spinning_svg } from "./App.main.module.scss";

roleAccessibilty.setRoutes({
  student: studentRoutes,
  teacher: teacherRoutes,
  admin: [...studentRoutes, ...teacherRoutes],
});

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

  const shouldHideFooter =
    window.location.hash.includes("dashboard") ||
    window.location.hash.includes("call");

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  const routesRoleConfig = user
    ? roleAccessibilty.getRoutesByRoles(user[rolesUrl])
    : {};

  const currentRole = user ? user[rolesUrl][0].toLowerCase() : "";

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
              </div>

              {isAuthenticated ? (
                <div class="navbar-end">
                  <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link is-arrowless">
                      <FontAwesomeIcon color="white" size="lg" icon={faBell} />
                    </a>
                    <div class="navbar-dropdown is-right">
                      <a class="navbar-item">Ir a clases</a>
                      <a class="navbar-item">Examen de lengua</a>
                      <a class="navbar-item">Entregar tarea de Historia</a>
                    </div>
                  </div>
                  <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link is-arrowless">
                      <FontAwesomeIcon color="white" size="lg" icon={faUser} />
                    </a>
                    <div class="navbar-dropdown is-right">
                      <a class="navbar-item">Mi perfil</a>
                      <hr class="dropdown-divider"></hr>
                      <a
                        class="navbar-item"
                        onClick={() =>
                          logout({ returnTo: window.location.origin })
                        }
                      >
                        Cerrar sesión
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="navbar-end">
                  <div class="navbar-item">
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </nav>
          </header>
          <div className="App is-flex">
            <div>
              <Sidebar />
            </div>
            <div
              className={`app-container ${
                !shouldHideFooter ? "" : " hide-footer"
              }`}
            >
              <div className="app-content">
                {isAuthenticated && (
                  <MainAppRoutes
                    routesRoleConfig={routesRoleConfig}
                    currentRole={currentRole}
                  />
                )}
                {!isAuthenticated && loginWithRedirect()}
              </div>
              {!shouldHideFooter && (
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
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainApp;
