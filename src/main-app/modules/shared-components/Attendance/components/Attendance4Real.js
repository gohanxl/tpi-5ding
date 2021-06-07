/* eslint-disable */
import React, { useState, useEffect } from "react";
import { AttendanceModal } from "./Attendance.modal";
import { useSelector } from "react-redux";

export const Attendance4Real = (props) => {
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
      setTimeout(() => setModalOpened(false), 5000);
    }
  };

  const checkAttendance = () => {
    try {
      signalRService.invokeCheckAttendance(classId, user.dbUser.Id, meetingId);
    } catch (e) {
      console.error(e);
    }
  };

  const iAmPresent = () => {
    try {
      signalRService.invokeIAmPresent(cronogramaId, user.dbUser.Id);
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
        <button className="button is-info" onClick={checkAttendance}>
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
