import axios from "axios";

export const activityService = {
  createActivity: (auth_token, reqBody) =>
    axios.post(`${process.env.REACT_APP_API_URL}/Actividad`, reqBody, {
      headers: { Authorization: "Bearer " + auth_token },
    }),
  getActivityType: () =>
    axios.get(`${process.env.REACT_APP_API_URL}/Actividad/tipo`),
  getActivityByClassId: (auth_token, classId) =>
    axios.get(`${process.env.REACT_APP_API_URL}/Actividad/clase/${classId}`, {
      headers: { Authorization: "Bearer " + auth_token },
    }),
  deleteActivityById: (auth_token, activityId) =>
    axios.delete(`${process.env.REACT_APP_API_URL}/Actividad/${activityId}`, {
      headers: { Authorization: "Bearer " + auth_token },
    }),
  getActivityById: (auth_token, activityId) =>
    axios.get(`${process.env.REACT_APP_API_URL}/Actividad/${activityId}`, {
      headers: { Authorization: "Bearer " + auth_token },
    }),
};
