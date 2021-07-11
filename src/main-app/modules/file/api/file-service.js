import axios from "axios";

export const TIPO_EVALUACIONES = "evaluaciones";
export const TIPO_TPS = "tps";
export const TIPO_TAREAS = "tareas";
export const TIPO_RECUPERTORIOS = "recuperatorios";

export const TIPO_ACTIVIDAD = {
  1: TIPO_EVALUACIONES,
  2: TIPO_TPS,
  3: TIPO_TAREAS,
  4: TIPO_RECUPERTORIOS,
};

export const SUBTIPO_CONSIGNAS = "consignas";
export const SUBTIPO_ENTREGAS = "entregas";
export const SUBTIPO_CORRECCIONES = "correcciones";

export const fileService = {
  uploadFile: (auth_token, formData, id, tipo, subtipo) =>
    axios.post(
      `${process.env.REACT_APP_API_URL}/File?tipo=${tipo}&subtipo=${subtipo}&id=${id}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + auth_token,
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  downloadFileByActivityId: (auth_token, userId, activityId) =>
    axios.get(
      `${process.env.REACT_APP_API_URL}/File/actividad/${userId}/${activityId}`,
      {
        headers: {
          Authorization: "Bearer " + auth_token,
        },
        responseType: "blob",
      }
    ),
  downloadStatsByClassId: (auth_token, classId) =>
    axios.get(`${process.env.REACT_APP_API_URL}/File/stats/${classId}`, {
      headers: {
        Authorization: "Bearer " + auth_token,
      },
      responseType: "blob",
    }),
};
