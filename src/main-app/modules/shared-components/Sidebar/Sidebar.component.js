import React from "react";
import { useHistory } from "react-router";
import "./Sidebar.styles.scss";

export const Sidebar = () => {
  const history = useHistory();
  const subjects = [
    { id: 1, name: "Lengua" },
    { id: 2, name: "Matemática" },
    { id: 3, name: "Ciencias Naturales" },
  ];

  return (
    <aside className="sidebar-menu menu">
      <ul className="menu-list">
        <li>
          <a
            className="is-active"
            onClick={() => history.push("/educapp/home")}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a onClick={() => history.push("/educapp/student")}>Student</a>
        </li>
        <li>
          <a onClick={() => history.push("/educapp/teacher")}>Profesor</a>
        </li>
      </ul>
      <ul className="menu-list">
        <li>
          <p>Materias</p>
          <ul>
            {subjects.map(({ id, name }) => (
              <li
                key={id}
                onClick={() =>
                  history.push("/educapp/student/assignature/" + id)
                }
              >
                {" "}
                <a>{name}</a>{" "}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  );
};
