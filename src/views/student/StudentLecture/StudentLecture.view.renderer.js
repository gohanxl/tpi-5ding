import React from "react";
import { institutosService } from "../../../api/instituto-service.js";

export const StudentLectureViewRenderer = () => {

  institutosService.getInstitutos('token').then(res => {
    console.log(res.data)
  });

  return (
    <div>
      <h1>MESSIRVE EL ESTUDEN</h1>
    </div>
  );
};
