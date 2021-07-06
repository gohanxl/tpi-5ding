import {
  faCalendarAlt,
  faEnvelope,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { roles, routes } from "../../../../App.constants";
import { calendarRoutes } from "../../../views/Calendar/calendar.routes";
import { rolesUrl } from "../../user/constants/user.constants";
import educAppLogo from "../../../../assets/img/logo.svg";
import "./Sidebar.styles.scss";

export const Sidebar = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const subjects = [
    { id: 1, name: "Bilogía" },
    { id: 2, name: "Geografía" },
    { id: 3, name: "Filosofia" },
    { id: 4, name: "Física" },
    { id: 5, name: "Historia" },
    { id: 6, name: "Inglés" },
    { id: 7, name: "Lengua" },
    { id: 8, name: "Matemática" },
    { id: 9, name: "Música" },
    { id: 10, name: "Química" },
  ];

  const goToPage = (page) => {
    setIsMenuOpen(false);
    history.push(page);
  };

  const currentRole = user?.metadata?.[rolesUrl][0] || "";
  const dashboardRole =
    currentRole.toLowerCase() === roles.ADMIN ? roles.TEACHER : currentRole;

  const dashboardRoute = routes.dashboard(dashboardRole.toLowerCase());

  return (
    <div className="sidebar-menu">
      <Menu isOpen={isMenuOpen}>
        <a
          id="home"
          className="menu-item"
          href="/#/educapp/dashboard"
          onClick={() => goToPage(dashboardRoute)}
        >
          <FontAwesomeIcon icon={faHome} className="mr-3" />
          Dashboard
        </a>
        <a
          id="home"
          className="menu-item"
          href="/#/educapp/calendar"
          onClick={() => goToPage(calendarRoutes)}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
          Calendario
        </a>
        <a
          id="home"
          className="menu-item"
          href="/#/"
          onClick={() => goToPage(dashboardRoute)}
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
          Mensajes
        </a>
        <p className="menu-group-title">Materias</p>
        {subjects.map(({ id, name }) => (
          <a
            key={id}
            className="menu-item assignature"
            href={"/#/educapp/materia-" + id}
            onClick={() => goToPage("/educapp/student/assignature/" + id)}
          >
            {name}
          </a>
        ))}
        <div className="sidebar-footer">
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
        </div>
      </Menu>
    </div>
  );
};
