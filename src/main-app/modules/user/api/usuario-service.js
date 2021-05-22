import axios from "axios";

export const userService = {
  getUserByEmail: (auth_token, email) =>
    axios.get(`${process.env.REACT_APP_API_URL}/Usuario?email=${email}`, {
      headers: { Authorization: "Bearer " + auth_token },
    }),
};
