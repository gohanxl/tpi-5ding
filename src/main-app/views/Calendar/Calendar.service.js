import axios from "axios";

export const calendarService = {
  getEvents: (auth_token, user_id) =>
    axios.get(`${process.env.REACT_APP_API_URL}/Eventos/${user_id}`, {
      headers: { Authorization: "Bearer " + auth_token },
    }),

  createEvent: (auth_token, body) =>
    axios.post(`${process.env.REACT_APP_API_URL}/Eventos`, body, {
      headers: { Authorization: "Bearer " + auth_token },
    }),

  deleteEvent: (auth_token, event_id) =>
    axios.delete(`${process.env.REACT_APP_API_URL}/Eventos/${event_id}`, {
      headers: { Authorization: "Bearer " + auth_token },
    }),
};
