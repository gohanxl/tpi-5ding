import React, { useState } from "react";
import "./Course.styles.scss";
import { ActivityComponent } from "./activity/components/Activity.component";
import { useHistory } from "react-router";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { rolesUrl } from "../../../user/constants/user.constants";

export const CourseComponent = (props) => {
  const SECTIONS = {
    CONTENIDOS: "CONTENIDOS",
    ACTIVIDADES: "ACTIVIDADES",
    ENTREGAS: "ENTREGAS",
    CORRECCIONES: "CORRECCIONES",
  };
  const history = useHistory();

  const [section, setSection] = useState(SECTIONS.ACTIVIDADES);
  const user = useSelector((state) => state.user.currentUser);
  const isTeacher = user?.metadata?.[rolesUrl].includes("Teacher");

  const downloadStats = (event) => {
    event.preventDefault();
    //TODO remove this console log and integrate lucho's endpoint
    console.log("DOWNLOAD STATS HERE");
  };

  return (
    <div className="container course_container">
      <div className="level">
        <h1 className="title is-2 course_subject_name level-left">
          {props.course.replace("_", " ") + " - " + props.title}
        </h1>
        {isTeacher && (
          <button
            className="button is-info level-right"
            onClick={downloadStats}
          >
            <FontAwesomeIcon icon={faDownload} />
            &nbsp; Descargar Estadísticas
          </button>
        )}
      </div>

      <div className="tabs is-medium is-right">
        <ul>
          <li
            // className={section === SECTIONS.CONTENIDOS ? "is-active" : ""}
            className="inactiveLink"
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
            // className={section === SECTIONS.ENTREGAS ? "is-active" : ""}
            className="inactiveLink"
          >
            <a>Entregas</a>
          </li>
          <li
            onClick={() => setSection(SECTIONS.CORRECCIONES)}
            // className={section === SECTIONS.CORRECCIONES ? "is-active" : ""}
            className="inactiveLink"
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
