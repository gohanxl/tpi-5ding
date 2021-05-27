import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { activityService } from "../api/activity-service";
import {
  fileService,
  SUBTIPO_CONSIGNAS,
  TIPO_TAREAS,
} from "../../file/api/file-service";

export const ActivityForm = (props) => {
  const { claseId } = props;

  const user = useSelector((state) => state.user.currentUser);

  const [activityType, setActivityType] = useState([]);

  useEffect(() => {
    activityService
      .getActivityType()
      .then((res) => setActivityType(res.data))
      .catch((err) => console.error(err));
  }, []);

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

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateForm(event)) {
      const reqBody = buildRequest(event);
      activityService
        .createActivity(user.token, reqBody)
        .then((res) => {
          console.log(res.data);
          const actividadId = res.data.Actividad.Id;
          let formData = new FormData();
          let file = document.querySelector("#activityFile");
          formData.append("file", file.files[0]);
          fileService
            .uploadFile(
              user.token,
              formData,
              actividadId,
              TIPO_TAREAS,
              SUBTIPO_CONSIGNAS
            )
            .then((res) => {
              console.log("Uploaded file successfully.");
              console.log(res.data);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } else {
      document.getElementById("activity_error").innerText =
        "Asegúrese de ingresar todos los campos requeridos.";
    }
  };

  return (
    <>
      <h1 className="title">Nueva Actividad</h1>
      <form onSubmit={onSubmit} method="POST">
        <div className="field">
          <label className="label">Tipo Actividad</label>
          <div className="select">
            <select name="TipoActividad">
              {activityType &&
                activityType.map((type) => (
                  <option key={type.Id} value={type.Id}>
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
                <i className="fas fa-upload" />
              </span>
              <span className="file-label">Elija un archivo…</span>
            </span>
            <span className="file-name">Adjunte la consgina en pdf... </span>
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
            <button className="button is-link">Crear Actividad</button>
          </div>
          <p style={{ color: "red" }} id="activity_error"></p>
          {/*TODO add if necessary to close form*/}
          {/*<div className="control">*/}
          {/*  <button className="button is-link is-light">Cancel</button>*/}
          {/*</div>*/}
        </div>
      </form>
    </>
  );
};
