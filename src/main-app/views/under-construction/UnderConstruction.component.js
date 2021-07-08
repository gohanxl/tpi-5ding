import React from "react";
import {
  under_construction,
  under_construction_text,
} from "./UnderConstruction.module.scss";

import development from "../../../assets/img/development.svg";

export const UnderConstruction = () => {
  return (
    <div className={under_construction}>
      <img
        src={development}
        alt="En construcción"
        width="800px"
        height="auto"
      />
      <h2 className={under_construction_text}>
        ¡Estamos en pleno desarrollo, muchas gracias por el apoyo!
      </h2>
    </div>
  );
};
