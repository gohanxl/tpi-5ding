/* eslint-disable */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export const ParticipantListComponent = (props) => {
  const { signalRService, toggle, meetingId } = props;
  const [localConnections, setLocalConnections] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [myUid, setMyUid] = useState();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (signalRService) {
      signalRService.startConnection(null);
      signalRService.listenUpdateParticipants(updateParticipants);
      signalRService.listenGetSelfUid(onReceiveGetSelfUid);
    }
  }, [signalRService]);

  useEffect(() => {
    if (signalRService && !myUid) {
      signalRService.invokeGetSelfUid();
    }
    setIsOpened(props.isOpened);
  }, [props]);

  const onReceiveGetSelfUid = (uid) => {
    console.log(`Recibi este uid: ${uid}`);
    setMyUid(uid);
  };

  const toggleChild = (e) => {
    e.preventDefault();
    setIsOpened((prevOpened) => !prevOpened);
    toggle();
  };

  const updateParticipants = (users) => {
    setLocalConnections(users);
  };

  const muteAllParticipants = () => {
    signalRService.invokeMuteAllParticipant(meetingId);
  };

  const muteParticipant = (uid) => {
    signalRService.invokeMuteParticipant(meetingId, uid);
  };

  const expelParticipant = (uid) => {
    signalRService.invokeRemoveParticipant(meetingId, uid);
  };

  const isTeacher = () => {
    return user && user.metadata
      ? user.metadata["https://5ding/roles"].includes("Teacher")
      : false;
  };

  return (
    <div className={isOpened ? "modal is-active" : "modal"}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Participantes</p>
          <button
            className="delete"
            aria-label="close"
            onClick={toggleChild}
          ></button>
        </header>
        <section className="modal-card-body">
          {isTeacher() && (
            <button
              className="button is-danger is-fullwidth"
              id="mutear_todos_btn"
              onClick={muteAllParticipants}
            >
              Mutear a Todos
            </button>
          )}
          <br />
          <div className="row">
            <p className="col-6">
              <strong>Nombre</strong>
            </p>
            <p className="col-2">
              <strong>Status</strong>
            </p>
            <p className="col-1">
              <strong>Acciones</strong>
            </p>
          </div>
          <ul>
            {localConnections &&
              localConnections.map((user) => (
                <li key={user.uid}>
                  <div className="row">
                    <p className="col-6">{user.displayName}</p>
                    {isTeacher() && (myUid ? user.uid !== myUid : true) && (
                      <div className="col-2">
                        <p>{user?.isPresent ? "Presente" : "Ausente"}</p>
                      </div>
                    )}
                    {isTeacher() && (myUid ? user.uid !== myUid : true) && (
                      <div className="col-1 level">
                        <div className="level-left">
                          <button
                            className="button is-danger level-item"
                            id={`mutear_${user.displayName}`}
                            title="Mutear Alumno"
                            onClick={(event) => muteParticipant(user.uid)}
                          >
                            <FontAwesomeIcon icon={faMicrophoneSlash} />
                          </button>
                        </div>
                        <div className="level-right">
                          <button
                            className="button is-danger level-item"
                            id={`expulsar_${user.uid}`}
                            title="Expulsar Alumno"
                            onClick={(event) => expelParticipant(user.uid)}
                          >
                            <FontAwesomeIcon icon={faBan} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </section>
        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  );
};
