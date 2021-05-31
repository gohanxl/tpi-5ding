import React from "react";
import "./Dashboard.styles.scss";
import Button from "../../button/Button.component";
import calendarSvg from "../../../../assets/img/education/043-calendar.svg";
import messageSvg from "../../../../assets/img/education/024-virtual class.svg";
import subjectSvg from "../../../../assets/img/education/015-list.svg";
import classSvg from "../../../../assets/img/education/005-school bell.svg";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <section className="dashboard-container">
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
              route="/educapp/student"
            />
          </div>
          <div className="level-item">
            <Button
              image={calendarSvg}
              title="CALENDARIO"
              route="/educapp/student"
            />
          </div>
        </div>
        <div className="level">
          <div className="level-item">
            <Button
              image={subjectSvg}
              title="MATERIAS"
              route="/educapp/student"
            />
          </div>
          <div className="level-item">
            <Button
              image={messageSvg}
              title="MENSAJES"
              route="/educapp/student"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
