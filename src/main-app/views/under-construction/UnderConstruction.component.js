import React from "react";
import {
  under_construction,
  under_construction_text,
} from "./UnderConstruction.module.scss";

export const UnderConstruction = () => {
  return (
    <div className={under_construction}>
      <div>SVG</div>
      <h2 className={under_construction_text}>
        ¡Estamos en pleno desarrollo, muchas gracias por el apoyo!
      </h2>
    </div>
  );
};
