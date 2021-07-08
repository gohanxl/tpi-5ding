import React, { useState } from "react";
import "./Course.styles.scss";
import { ActivityComponent } from "./activity/components/Activity.component";
import { useHistory } from "react-router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const CourseComponent = (props) => {
  const SECTIONS = {
    CONTENIDOS: "CONTENIDOS",
    ACTIVIDADES: "ACTIVIDADES",
    ENTREGAS: "ENTREGAS",
    CORRECCIONES: "CORRECCIONES",
  };
  const history = useHistory();

  const [section, setSection] = useState(SECTIONS.CONTENIDOS);

  return (
    <div className="container course_container">
      <h1 className="title is-2 course_subject_name">
        {props.course.replace("_", " ") + " - " + props.title}
      </h1>
      <div className="tabs is-medium is-right">
        <ul>
          <li
            className={section === SECTIONS.CONTENIDOS ? "is-active" : ""}
            onClick={() => setSection(SECTIONS.CONTENIDOS)}
          >
            <a>Contenidos</a>
          </li>
          <li
            onClick={() => setSection(SECTIONS.ACTIVIDADES)}
            className={section === SECTIONS.ACTIVIDADES ? "is-active" : ""}
          >
            <a>Actividades</a>
          </li>
          <li
            onClick={() => setSection(SECTIONS.ENTREGAS)}
            className={section === SECTIONS.ENTREGAS ? "is-active" : ""}
          >
            <a>Entregas</a>
          </li>
          <li
            onClick={() => setSection(SECTIONS.CORRECCIONES)}
            className={section === SECTIONS.CORRECCIONES ? "is-active" : ""}
          >
            <a>Correcciones</a>
          </li>
        </ul>
      </div>
      <div>
        {section === SECTIONS.CONTENIDOS && <h1>CONTENIDOS AQUI</h1>}
        {section === SECTIONS.ACTIVIDADES && <ActivityComponent />}
        {section === SECTIONS.ENTREGAS && <h1>ENTREGAS AQUI</h1>}
        {section === SECTIONS.CORRECCIONES && <h1>CORRECCIONES AQUI</h1>}
      </div>
      <br />
      <div className="level-right">
        <button
          className="button is-info"
          onClick={() => {
            history.push("/educapp/teacher/courses");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    </div>
  );
};
