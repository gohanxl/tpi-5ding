import axios from "axios";

export const fileService = {
  uploadTareaConsigna: (auth_token, formData, actividadId) =>
    axios.post(
      `${process.env.REACT_APP_API_URL}/File?tipo=tareas&subtipo=consignas&actividadId=${actividadId}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + auth_token,
          "Content-Type": "multipart/form-data",
        },
      }
    ),
};
