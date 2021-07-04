import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { activityService } from "../api/activity-service";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import {
  fileService,
  SUBTIPO_CONSIGNAS,
  TIPO_ACTIVIDAD,
} from "../../../../../file/api/file-service";

import "./Activity.styles.scss";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ActivityForm = (props) => {
  const { claseId, activityId } = props;

  const user = useSelector((state) => state.user.currentUser);
  const [activityType, setActivityType] = useState([]);
  // eslint-disable-next-line
  const [activity, setActivity] = useState();

  const history = useHistory();

  useEffect(() => {
    if (activityId) {
      activityService
        .getActivityById(user.token, activityId)
        .then((res) => setActivity(res.data.Actividad))
        .catch((err) => console.error(err));
    }
    activityService
      .getActivityType()
      .then((res) => {
        setActivityType(res.data);
      })
      .catch((err) => console.error(err));
  }, [activityId]);

  const buildRequest = (event) => {
    let reqBody = {};
    reqBody.TipoActividad = event.target["TipoActividad"].value;
    reqBody.Titulo = event.target["Titulo"].value;
    reqBody.Descripcion = event.target["Descripcion"].value;
    reqBody.ClaseId = event.target["ClaseId"].value;
    reqBody.ProfesorId = event.target["ProfesorId"].value;
    return reqBody;
  };

  const validateForm = (event) => {
    let formIsValid = true;
    document.getElementById("activity_error").innerText = "";
    if (!event.target["Titulo"].value) {
      event.target["Titulo"].classList.add("is-danger");
      formIsValid = false;
    } else {
      event.target["Titulo"].classList.remove("is-danger");
    }
    if (!event.target["Descripcion"].value) {
      event.target["Descripcion"].classList.add("is-danger");
      formIsValid = false;
    } else {
      event.target["Descripcion"].classList.remove("is-danger");
    }
    return formIsValid;
  };

  const uploadFile = (res) => {
    const actividadId = res.data.Actividad.Id;
    const tipoActividad = res.data.Actividad.TipoActividad;
    let formData = new FormData();
    let file = document.querySelector("#activityFile");
    if (file && file.files && file.files[0]) {
      formData.append("file", file.files[0]);
      fileService
        .uploadFile(
          user.token,
          formData,
          actividadId,
          TIPO_ACTIVIDAD[tipoActividad.toString()],
          SUBTIPO_CONSIGNAS
        )
        .then(() => {
          history.goBack();
        })
        .catch((err) => console.error(err));
    } else {
      history.goBack();
    }
  };

  const createActivity = (event) => {
    if (validateForm(event)) {
      const reqBody = buildRequest(event);
      activityService
        .createActivity(user.token, reqBody)
        .then(uploadFile)
        .catch((err) => console.error(err));
    } else {
      document.getElementById("activity_error").innerText =
        "Asegúrese de ingresar todos los campos requeridos.";
    }
  };

  const updateActivity = (event) => {
    if (validateForm(event)) {
      const reqBody = buildRequest(event);
      reqBody.Id = activity.Id;
      reqBody.FilePath = activity.FilePath;
      activityService
        .updateActivity(user.token, reqBody)
        .then(uploadFile)
        .catch((err) => console.error(err));
    } else {
      document.getElementById("activity_error").innerText =
        "Asegúrese de ingresar todos los campos requeridos.";
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!activity) {
      createActivity(event);
    } else {
      updateActivity(event);
    }
  };

  return (
    <div className="container form_container">
      <h1 className="title">
        {activity ? "Modificar Actividad" : "Nueva Actividad"}
      </h1>
      <form onSubmit={onSubmit} method="POST">
        <div className="field">
          <label className="label">Tipo Actividad</label>
          <div className="select">
            <select name="TipoActividad">
              {activityType &&
                activityType.map((type) => (
                  <option
                    key={type.Id}
                    value={type.Id}
                    selected={activity?.TipoActividad === type.Id}
                  >
                    {type.Nombre}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">Título</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Ingrese el título de su actividad"
              name="Titulo"
              defaultValue={activity?.Titulo}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Consigna</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Ingrese la consigna"
              name="Descripcion"
              defaultValue={activity?.Descripcion}
            />
          </div>
        </div>

        <div className="file is-primary has-name">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="file"
              id="activityFile"
            />
            <span className="file-cta">
              <span className="file-icon">
                <FontAwesomeIcon icon={faUpload} />
              </span>
              <span className="file-label">Elija un archivo…</span>
            </span>
            <span className="file-name">Adjunte la consgina... </span>
          </label>
        </div>

        <br />

        <input className="input" type="hidden" name="ClaseId" value={claseId} />
        {user && user.dbUser && (
          <input
            className="input"
            type="hidden"
            name="ProfesorId"
            value={user.dbUser.Id}
          />
        )}

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">
              {activity ? "Modificar Actividad" : "Crear Actividad"}
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link is-light"
              onClick={(event) => {
                event.preventDefault();
                history.goBack();
              }}
            >
              Cancel
            </button>
          </div>
          <p style={{ color: "red" }} id="activity_error"></p>
        </div>
      </form>
    </div>
  );
};
