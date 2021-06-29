import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar } from "./modules/shared-components/Sidebar/Sidebar.component";
import { MainAppRoutes } from "./App.main.routes";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import {
  setCurrentUser,
  setIsColorBlind,
} from "../main-app/modules/user/store/user.actions";
import { userService } from "../main-app/modules/user/api/usuario-service";
import { studentRoutes } from "./views/student/student.routes";
import { teacherRoutes } from "./views/teacher/teacher.routes";
import { roleAccessibilty } from "./modules/auth/service/roles.service";
import { rolesUrl } from "./modules/user/constants/user.constants";
import educAppWhiteLogo from "../assets/img/logo-white.svg";
import educAppLogo from "../assets/img/logo.svg";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "./modules/ui-styling/components/Loader/Loader.component";
import {
  spinning_svg,
  colorblind_wrapper,
  colorblind_switch,
  educapp_nav__items,
} from "./App.main.module.scss";
import Switch from "react-switch";
import {
  colorblindModeThemeValues,
  rootStyles,
  routes,
  standardThemeValues,
} from "../App.constants";

roleAccessibilty.setRoutes({
  student: studentRoutes,
  teacher: teacherRoutes,
  admin: [...studentRoutes, ...teacherRoutes],
});

const MainApp = () => {
  const dispatch = useDispatch();
  // const [hideFooter, setHideFooter] = useState(true);
  const [switchValue, setSwitchValue] = useState(
    Boolean(localStorage.getItem("color-blind"))
  );

  const colorblindSwitch = useRef(null);

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

  const routesRoleConfig = user
    ? roleAccessibilty.getRoutesByRoles(user[rolesUrl])
    : {};

  const currentRole = user ? user[rolesUrl][0].toLowerCase() : "";

  const shouldHideFooter =
    window.location.hash.includes("dashboard") ||
    window.location.hash.includes("call");

  useEffect(
    function changeStylesMode() {
      let root = document.documentElement;
      if (switchValue) {
        rootStyles.forEach((rootStyle, index) => {
          root.style.setProperty(
            rootStyle,
            colorblindModeThemeValues[rootStyles[index]]
          );
        });
        localStorage.setItem("color-blind", "true");
        dispatch(setIsColorBlind(true));
      } else {
        rootStyles.forEach((rootStyle, index) => {
          root.style.setProperty(rootStyle, standardThemeValues[index]);
        });
        localStorage.setItem("color-blind", "false");
        dispatch(setIsColorBlind(false));
      }
    },
    [dispatch, switchValue]
  );

  // useEffect(() => {
  //   setHideFooter(
  //     window.location.hash == "#/educapp/home" ||
  //       window.location.hash == "#/educapp/teacher/call"
  //   );
  // }, []);

  if (error) {
    return <div>Ups... Falló Auth0</div>;
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
                <a
                  className="navbar-item"
                  href={`/#/${routes.dashboard(currentRole)}`}
                >
                  <img
                    src={educAppWhiteLogo}
                    alt="Educapp logo"
                    width="30"
                    height="30"
                  />
                </a>
              </div>

              {isAuthenticated ? (
                <div className="navbar-end">
                  <div
                    className={`navbar-item has-dropdown is-hoverable ${educapp_nav__items}`}
                  >
                    <a className="navbar-link is-arrowless">
                      <FontAwesomeIcon size="lg" icon={faBell} />
                    </a>
                    <div className="navbar-dropdown is-right">
                      <a className="navbar-item">Ir a clases</a>
                      <a className="navbar-item">Examen de lengua</a>
                      <a className="navbar-item">Entregar tarea de Historia</a>
                    </div>
                  </div>
                  <div
                    className={`navbar-item has-dropdown is-hoverable ${educapp_nav__items}`}
                  >
                    <a className="navbar-link is-arrowless">
                      <FontAwesomeIcon size="lg" icon={faUser} />
                    </a>
                    <div className="navbar-dropdown is-right">
                      <a className="navbar-item">Mi perfil</a>
                      <a className={`navbar-item ${colorblind_wrapper}`}>
                        <span>Modo Daltónico</span>
                        <Switch
                          id="switch"
                          ref={colorblindSwitch}
                          className={colorblind_switch}
                          checked={switchValue}
                          onChange={() => {
                            if (colorblindSwitch.current.$inputRef) {
                              colorblindSwitch.current.$inputRef.blur();
                            } else if (colorblindSwitch.current.H) {
                              colorblindSwitch.current.H.blur();
                            } else {
                              console.error(
                                "Blind mode not working in production!!"
                              );
                            }
                            setSwitchValue(!switchValue);
                          }}
                          onColor="#00b4b2"
                        />
                      </a>
                      <hr className="dropdown-divider"></hr>
                      <a
                        className="navbar-item"
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
                <div className="navbar-end">
                  <div className="navbar-item">
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
                shouldHideFooter ? "hide-footer" : ""
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
