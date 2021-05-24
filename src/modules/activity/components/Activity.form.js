import React, { useState } from "react";
import { useSelector } from "react-redux";
import { activityService } from "../api/activity-service";

export const ActivityForm = (props) => {
  const { claseId } = props;

  const user = useSelector((state) => state.user.currentUser);

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
        .then((res) => console.log(res.data))
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
              {/*TODO bring this from backend*/}
              <option value={1}>Evaluacion</option>
              <option value={2}>Tp</option>
              <option value={3}>Tarea</option>
              <option value={4}>Recuperatorio</option>
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
