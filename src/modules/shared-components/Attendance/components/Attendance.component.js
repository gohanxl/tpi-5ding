import React, { useState, useEffect } from "react";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { AttendanceModal } from "./Attendance.modal";
import { useSelector } from "react-redux";

export const Attendance = (props) => {

    const { classId } = props;
    const [connection, setConnection] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const [cronogramaId, setCronogramaId] = useState(classId);

    const user = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/hubs/asistencia", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    console.log("Connected!");

                    connection.on("PedirAsistencia", (cronogramaId) => {
                        // if (!isTeacher()) {
                            setCronogramaId(cronogramaId);
                            setModalOpened(true);
                        // }
                    });

                })
                .catch((e) => console.log("Connection failed: ", e));
        }
    }, [connection]);

    const checkAttendance = () => {
        if (connection.connectionStarted) {
            try {
                console.log(user)
                connection.invoke("TomarLista", classId);
            } catch (e) {
                console.log(e);
            }
        } else {
            alert("No connection to server yet.");
        }
    };

    const iAmPresent = () => {
        if (connection.connectionStarted) {
            try {
                connection.invoke("DarPresente", cronogramaId, user.dbUser.Id);
                setModalOpened(false);
            } catch (e) {
                console.log(e);
            }
        } else {
            alert("No connection to server yet.");
        }
    }

    const toggle = () => {
        setModalOpened(prevOpened => !prevOpened);
    }

    const isTeacher = () => {
        return user && user.metadata ? user.metadata['https://5ding/roles'].includes("Teacher") : false
    }

    return (<div>
        {isTeacher() && <button className="button is-info" onClick={checkAttendance}>Tomar Lista</button>}
        <AttendanceModal isOpened={modalOpened} iAmPresent={iAmPresent} cronogramaId={cronogramaId} toggle={toggle}/>
    </div>)
}