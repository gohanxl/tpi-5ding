import React from "react";
import {
  support_text,
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
        width="550px"
        height="auto"
      />
      <h3 className={`title is-3 ${under_construction_text}`}>
        Estamos en pleno desarrollo
      </h3>
      <h2 className={`title is-2 ${support_text}`}>
        ¡Muchas gracias por el apoyo!
      </h2>
    </div>
  );
};
