import React, { useEffect } from "react";
import "./Dashboard.styles.scss";
import Button from "../../button/Button.component";
import calendarSvg from "../../../../assets/img/education/043-calendar.svg";
import messageSvg from "../../../../assets/img/education/024-virtual class.svg";
import subjectSvg from "../../../../assets/img/education/015-list.svg";
import classSvg from "../../../../assets/img/education/005-school bell.svg";
import { useSelector } from "react-redux";
import { routes } from "../../../../App.constants";

export const Dashboard = ({ isTeacher }) => {
  const user = useSelector((state) => state.user.currentUser);
  const isColorBlind = useSelector((state) => state.user.isColorBlind);

  useEffect(() => {
    const dashboard = document.getElementById("dashboard");
    if (dashboard) {
      if (isColorBlind) {
        dashboard.style.backgroundImage =
          "var(--colorblind-dashboard-background)";
      } else {
        dashboard.style.backgroundImage = "var(--dashboard-background)";
      }
    }
  }, [isColorBlind]);

  return (
    <section id="dashboard" className="dashboard-container">
      <div className="title-container">
        <h2 className="title is-3 dashboard-greeting">
          <strong>¡Hola de nuevo!</strong>
        </h2>
        <h1 className="title is-2 dashboard-name">
          <strong>{user && user.dbUser ? user.dbUser.Nombre : ""}</strong>
        </h1>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="link-container">
        <div className="level">
          <div className="level-item">
            <Button
              image={classSvg}
              title="ENTRAR A CLASE"
              route={`/educapp/${isTeacher ? "teacher" : "student"}/call`}
            />
          </div>
          <div className="level-item">
            <Button
              image={calendarSvg}
              title="CALENDARIO"
              route={routes.underConstruction}
            />
          </div>
        </div>
        <div className="level">
          <div className="level-item">
            <Button
              image={subjectSvg}
              title="MATERIAS"
              route={routes.underConstruction}
            />
          </div>
          <div className="level-item">
            <Button
              image={messageSvg}
              title="MENSAJES"
              route={routes.underConstruction}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
