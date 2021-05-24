import axios from "axios";

export const activityService = {
  createActivity: (auth_token, reqBody) =>
    axios.post(`${process.env.REACT_APP_API_URL}/Actividad`, reqBody, {
      headers: { Authorization: "Bearer " + auth_token },
    }),
};
