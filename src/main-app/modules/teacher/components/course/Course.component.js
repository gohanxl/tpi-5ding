import React, { useState } from "react";
import "./Course.styles.scss";
import { ActivityComponent } from "./activity/components/Activity.component";

export const CourseComponent = () => {
  const SECTIONS = {
    CONTENIDOS: "CONTENIDOS",
    ACTIVIDADES: "ACTIVIDADES",
    ENTREGAS: "ENTREGAS",
    CORRECCIONES: "CORRECCIONES",
  };

  const [section, setSection] = useState(SECTIONS.CONTENIDOS);

  return (
    <div className="container course_container">
      <h1 className="title is-2">Historia - 5to A</h1>
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
    </div>
  );
};
