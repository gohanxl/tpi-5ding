import React, { useEffect, useState } from "react";
import { TableComponent } from "../../../../../shared-components/grid/components/Table.component";
import { activityService } from "../api/activity-service";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TIPO_ACTIVIDAD } from "../../../../../file/api/file-service";
import {
  faDownload,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ActivityComponent = () => {
  const headers = ["Id", "Fecha", "Tipo Actividad", "Titulo", "Acciones"];

  const user = useSelector((state) => state.user.currentUser);
  // eslint-disable-next-line
  const [data, setData] = useState([]);

  //TODO onClick actions
  const actions = (actividad) => {
    return (
      <div key={1} className="buttons are-small">
        {actividad.FilePath && (
          <button className="button is-info is-light">
            <FontAwesomeIcon icon={faDownload} />
          </button>
        )}
        {!actividad.FilePath && (
          <button className="button is-info is-light" disabled>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        )}

        <button className="button is-success is-light">
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        <button className="button is-danger is-light">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  };

  const formatDate = (dateToFormat) => {
    const splitDate = dateToFormat.split("T");
    const date = splitDate[0];
    const hours = splitDate[1].split(".")[0];
    return date + " " + hours;
  };

  useEffect(() => {
    activityService
      .getActivityByClassId(user.token, 1)
      .then((res) => {
        console.log(res.data);
        const data = res.data.Actividades.map((actividad) => {
          let tipoActividad =
            TIPO_ACTIVIDAD[actividad.TipoActividad.toString()];
          tipoActividad = tipoActividad
            .substring(0, tipoActividad.length - 1)
            .toUpperCase();

          return [
            actividad.Id,
            formatDate(actividad.FechaAlta),
            tipoActividad,
            actividad.Titulo,
            actions(actividad),
          ];
        });
        console.log(data);
        setData(data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  const history = useHistory();

  return (
    <div>
      <button
        className="button is-success"
        onClick={() => {
          history.push("/educapp/teacher/activity");
        }}
      >
        + Nueva Actividad
      </button>
      <br />
      <br />
      <TableComponent headers={headers} data={data} />
    </div>
  );
};
