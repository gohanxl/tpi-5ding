import axios from "axios";

export const calendarService = {
  getEvents: (auth_token) =>
    axios.get(`${process.env.REACT_APP_API_URL}/events`, {
      headers: { Authorization: "Bearer " + auth_token },
    }),

  createEvent: (auth_token, body) =>
    axios.post(`${process.env.REACT_APP_API_URL}/events`, body, {
      headers: { Authorization: "Bearer " + auth_token },
    }),
};
