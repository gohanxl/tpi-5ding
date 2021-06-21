import {
  faCalendarAlt,
  faEnvelope,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useHistory } from "react-router";
import "./Sidebar.styles.scss";

export const Sidebar = () => {
  const history = useHistory();

  let isMenuOpen = function (state) {
    return state.isOpen;
  };

  const subjects = [
    { id: 1, name: "Lengua" },
    { id: 2, name: "Matemática" },
    { id: 3, name: "Ciencias Naturales" },
  ];

  const goToPage = (event, page) => {
    event.preventDefault();
    history.push(page);
    isMenuOpen = false;
  };

  return (
    <div className="sidebar-menu">
      <Menu isOpen={isMenuOpen(false)}>
        <a
          id="home"
          className="menu-item"
          href="#dashboard"
          onClick={(e) => goToPage(e, "/educapp/home")}
        >
          <FontAwesomeIcon icon={faHome} className="mr-3" />
          Dashboard
        </a>
        <a
          id="home"
          className="menu-item"
          href="#calendario"
          onClick={(e) => goToPage(e, "/educapp/home")}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
          Calendario
        </a>
        <a
          id="home"
          className="menu-item"
          href="#mensajes"
          onClick={(e) => goToPage(e, "/educapp/home")}
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
          Mensajes
        </a>
        <p className="menu-group-title">Materias</p>
        {subjects.map(({ id, name }) => (
          <a
            key={id}
            className="menu-item assignature"
            href={"#materia-" + id}
            onClick={(e) => goToPage(e, "/educapp/student/assignature/" + id)}
          >
            {name}
          </a>
        ))}
      </Menu>
    </div>
  );
};
