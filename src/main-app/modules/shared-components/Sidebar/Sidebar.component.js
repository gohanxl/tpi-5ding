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
  const subjects = [
    { id: 1, name: "Lengua" },
    { id: 2, name: "Matemática" },
    { id: 3, name: "Ciencias Naturales" },
  ];

  const goToPage = (event, page) => {
    event.preventDefault();
    history.push(page);
  };

  return (
    <div className="sidebar-menu">
      <Menu>
        <a
          id="home"
          className="menu-item"
          href="#"
          onClick={(e) => goToPage(e, "/educapp/home")}
        >
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Dashboard
        </a>
        <a
          id="home"
          className="menu-item"
          href="#"
          onClick={(e) => goToPage(e, "/educapp/home")}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
          Calendario
        </a>
        <a
          id="home"
          className="menu-item"
          href="#"
          onClick={(e) => goToPage(e, "/educapp/home")}
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          Mensajes
        </a>
        <a
          id="student"
          className="menu-item"
          href="#"
          onClick={(e) => goToPage(e, "/educapp/student")}
        >
          Student
        </a>
        <a
          id="profesor"
          className="menu-item"
          href="#"
          onClick={(e) => goToPage(e, "/educapp/teacher")}
        >
          Profesor
        </a>
        <p className="menu-item mt-4">Materias</p>
        {subjects.map(({ id, name }) => (
          <a
            key={id}
            className="menu-item"
            href=""
            onClick={(e) => goToPage(e, "/educapp/student/assignature/" + id)}
          >
            {name}
          </a>
        ))}
      </Menu>
    </div>
  );
};
