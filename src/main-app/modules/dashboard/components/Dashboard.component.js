import React from "react";
import "./Dashboard.styles.scss";
import Button from "../../button/Button.component";
import calendarSvg from "../../../../assets/img/education/043-calendar.svg";
import messageSvg from "../../../../assets/img/education/024-virtual class.svg";
import subjectSvg from "../../../../assets/img/education/015-list.svg";
import classSvg from "../../../../assets/img/education/005-school bell.svg";

const Dashboard = () => {
  return (
    <section className="dashboard-container">
      <div className="title-container">
        <h2 className="title is-3 dashboard-greeting">
          <strong>¡Hola de nuevo!</strong>
        </h2>
        <h1 className="title is-2 dashboard-name">
          <strong>Ignacio</strong>
        </h1>
      </div>
      <br />
      <br />
      <br />
      <div className="link-container">
        <div className="level">
          <div className="level-item">
            <Button image={messageSvg} title="MENSAJES" />
          </div>
          <div className="level-item">
            <Button image={calendarSvg} title="CALENDARIO" />
          </div>
        </div>
        <div className="level">
          <div className="level-item">
            <Button image={subjectSvg} title="MATERIAS" />
          </div>
          <div className="level-item">
            <Button image={classSvg} title="ENTRAR A CLASE" />
          </div>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
};

export default Dashboard;
