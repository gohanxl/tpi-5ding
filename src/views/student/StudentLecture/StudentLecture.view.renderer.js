import React from "react";
import { institutosService } from "./api/instituto-service.js";

export const StudentLectureViewRenderer = () => {
  return (
    <div>
      <h1>MESSIRVE EL ESTUDEN</h1>

      institutosService.getInstitutos()

      
    </div>
  );
};
