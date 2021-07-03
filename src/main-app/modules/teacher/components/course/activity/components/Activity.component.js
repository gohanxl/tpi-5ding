import React, { useEffect, useState } from "react";
import { TableComponent } from "../../../../../shared-components/grid/components/Table.component";
import { activityService } from "../api/activity-service";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TIPO_ACTIVIDAD } from "../../../../../file/api/file-service";

export const ActivityComponent = () => {
  const headers = ["Id", "Fecha", "Tipo Actividad", "Titulo", "Acciones"];

  const user = useSelector((state) => state.user.currentUser);
  // eslint-disable-next-line
  const [data, setData] = useState([]);

  const actions = () => {
    return (
      <div key={1} className="buttons are-small">
        <button className="button is-success is-light is-rounded">
          Editar
        </button>
        <button className="button is-danger is-light is-rounded">
          Eliminar
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
            actions(),
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
