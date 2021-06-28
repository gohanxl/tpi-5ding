/* eslint-disable */
import React, { useState, useEffect } from "react";
import { AttendanceModal } from "./Attendance.modal";
import { useSelector } from "react-redux";
import { attendanceService } from "../api/attendance-service";
import "./Attendance.styles.scss";

export const Attendance = (props) => {
  const { classId, meetingId, signalRService } = props;
  const [modalOpened, setModalOpened] = useState(false);
  const [cronogramaId, setCronogramaId] = useState(classId);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (signalRService) {
      signalRService.startConnection(null);
      signalRService.listenAskForAttendance(askForAttendance);
    }
  }, [signalRService]);

  const askForAttendance = (cronoId) => {
    if (!isTeacher()) {
      setCronogramaId(cronoId);
      setModalOpened(true);
      setTimeout(() => {
        setModalOpened(false);
      }, 5000);
    }
  };

  const checkAttendance = () => {
    attendanceService
      .absentStudents(user.token, classId)
      .then((res) => {
        signalRService.invokeCheckAttendance(
          classId,
          user.dbUser.Id,
          meetingId
        );
      })
      .catch((err) => console.error(err));
  };

  const iAmPresent = () => {
    try {
      signalRService.invokeIAmPresent(cronogramaId, user.dbUser.Id, meetingId);
      setModalOpened(false);
    } catch (e) {
      console.error(e);
    }
  };

  const toggle = () => {
    setModalOpened((prevOpened) => !prevOpened);
  };

  const isTeacher = () => {
    return user && user.metadata
      ? user.metadata["https://5ding/roles"].includes("Teacher")
      : false;
  };

  return (
    <div>
      {isTeacher() && (
        <button className="button attendance_button" onClick={checkAttendance}>
          Tomar Lista
        </button>
      )}
      <AttendanceModal
        isOpened={modalOpened}
        iAmPresent={iAmPresent}
        cronogramaId={cronogramaId}
        toggle={toggle}
      />
    </div>
  );
};
