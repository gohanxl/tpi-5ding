import axios from "axios";

export const attendanceService = {
  absentStudents: (auth_token, cronogramaId) =>
    axios.put(
      `${process.env.REACT_APP_API_URL}/Asistencia/ponerAusente/${cronogramaId}`,
      {},
      {
        headers: { Authorization: "Bearer " + auth_token },
      }
    ),
};
