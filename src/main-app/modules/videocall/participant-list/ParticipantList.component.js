/* eslint-disable */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { rolesUrl } from "../../user/constants/user.constants";
import "./ParticipantList.styles.scss";
import educAppLogo from "../../../../assets/img/logo.svg";

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

  const isTeacher = user?.metadata?.[rolesUrl].includes("Teacher");

  return (
    <div className={isOpened ? "modal is-active" : "modal"}>
      <div className="modal-card">
        <div className="modal-card-head">
          <h2 className="modal-card-title">Participantes</h2>
          <button
            className="delete"
            aria-label="close"
            onClick={toggleChild}
          ></button>
        </div>
        <section className="modal-card-body">
          {isTeacher && (
            <button
              className="btn btn-danger w-100 mb-3 mute-all"
              id="mutear_todos_btn"
              onClick={muteAllParticipants}
            >
              Mutear a Todos
            </button>
          )}
          <table className="table plist-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>{isTeacher ? "Estado" : ""}</th>
                <th>{isTeacher ? "Acciones" : ""}</th>
              </tr>
            </thead>
            <tbody>
              {localConnections &&
                localConnections.map((user) => (
                  <tr key={user.uid}>
                    <th>{user.displayName}</th>

                    {isTeacher && (myUid ? user.uid !== myUid : true) && (
                      <th>{user?.isPresent ? "Presente" : "Ausente"}</th>
                    )}

                    {!(isTeacher && (myUid ? user.uid !== myUid : true)) && (
                      <th></th>
                    )}

                    {isTeacher && (myUid ? user.uid !== myUid : true) && (
                      <th>
                        <button
                          className="btn btn-danger mr-2"
                          id={`mutear_${user.displayName}`}
                          title="Mutear Alumno"
                          onClick={(event) => muteParticipant(user.uid)}
                        >
                          <FontAwesomeIcon icon={faMicrophoneSlash} />
                        </button>
                        <button
                          className="btn btn-danger"
                          id={`expulsar_${user.uid}`}
                          title="Expulsar Alumno"
                          onClick={(event) => expelParticipant(user.uid)}
                        >
                          <FontAwesomeIcon icon={faBan} />
                        </button>
                      </th>
                    )}
                    {!(isTeacher && (myUid ? user.uid !== myUid : true)) && (
                      <th></th>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <div className="modal-card-foot justify-content-center">
          <p className="has-text-centered">
            <span>Powered by</span>
            <img
              src={educAppLogo}
              className="mx-2 mb-1"
              alt="Educapp logo"
              width="20"
            />
            <b>EducApp</b>
          </p>
        </div>
      </div>
    </div>
  );
};
