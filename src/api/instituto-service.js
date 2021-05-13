import axios from "axios";

export const institutosService = {
  getInstitutos: (auth_token) =>
    axios.get(`${window._env_.API_URL}/Institutos`, {
      Headers: { Authorization: auth_token },
    }),
};
