import React, { useEffect } from "react";
import "./Dashboard.styles.scss";
import Button from "../../button/Button.component";
import calendarSvg from "../../../../assets/img/education/043-calendar.svg";
import messageSvg from "../../../../assets/img/education/024-virtual class.svg";
import subjectSvg from "../../../../assets/img/education/015-list.svg";
import classSvg from "../../../../assets/img/education/005-school bell.svg";
import colorBlind_class from "../../../../assets/img/alarm-bell.svg";
import colorBlind_message from "../../../../assets/img/message.svg";
import colorBlind_calendar from "../../../../assets/img/calendar.svg";
import colorBlind_subject from "../../../../assets/img/list.svg";
import { useSelector } from "react-redux";

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
              image={isColorBlind ? colorBlind_class : classSvg}
              title="ENTRAR A CLASE"
              route={`/educapp/${isTeacher ? "teacher" : "student"}/call`}
            />
          </div>
          <div className="level-item">
            <Button
              image={isColorBlind ? colorBlind_calendar : calendarSvg}
              title="CALENDARIO"
              route="/educapp/student"
            />
          </div>
        </div>
        <div className="level">
          <div className="level-item">
            <Button
              image={isColorBlind ? colorBlind_subject : subjectSvg}
              title="MATERIAS"
              route="/educapp/student"
            />
          </div>
          <div className="level-item">
            <Button
              image={isColorBlind ? colorBlind_message : messageSvg}
              title="MENSAJES"
              route="/educapp/student"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
