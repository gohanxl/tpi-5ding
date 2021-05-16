import axios from "axios";

export const institutosService = {
  getInstitutos: (auth_token) =>
    axios.get(`${process.env.REACT_APP_API_URL}/Institutos`, { headers: { Authorization: 'Bearer ' + auth_token } }),
};
