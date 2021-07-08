import React from "react";
import Button from "../../../modules/button/Button.component";
import literatureSvg from "../../../../assets/img/education/017-literature.svg";
import geographySvg from "../../../../assets/img/education/008-geography.svg";
import historySvg from "../../../../assets/img/education/007-history.svg";
import musicSvg from "../../../../assets/img/education/009-music.svg";
import artSvg from "../../../../assets/img/education/016-art.svg";
import chemistrySvg from "../../../../assets/img/education/045-chemistry.svg";
import phEducSvg from "../../../../assets/img/education/021-physical education.svg";
import mathSvg from "../../../../assets/img/education/038-maths.svg";
import "./StudentAssignatureList.styles.scss";

export const StudentAssignatureListViewRenderer = () => {
  return (
    <section className="container">
      <h2 className="title is-2 assignature-title">
        <strong>Materias</strong>
      </h2>
      <div className="level">
        <div className="level-item">
          <Button image={literatureSvg} title="LENGUA" />
        </div>
        <div className="level-item">
          <Button
            image={geographySvg}
            title="GEOGRAFÍA"
            route="/educapp/student/Geografía/5to_A"
          />
        </div>
        <div className="level-item">
          <Button image={historySvg} title="HISTORIA" />
        </div>
        <div className="level-item">
          <Button image={musicSvg} title="MÚSICA" />
        </div>
      </div>
      <div className="level">
        <div className="level-item">
          <Button image={artSvg} title="ARTE" />
        </div>
        <div className="level-item">
          <Button image={chemistrySvg} title="QUÍMICA" />
        </div>
        <div className="level-item">
          <Button image={phEducSvg} title="ED. FÍSICA" />
        </div>
        <div className="level-item">
          <Button image={mathSvg} title="MATEMÁTICAS" />
        </div>
      </div>
      <br />
      <br />
    </section>
  );
};
