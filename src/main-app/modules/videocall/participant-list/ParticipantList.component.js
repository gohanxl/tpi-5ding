/* eslint-disable */
import React, { useEffect, useState } from "react";

export const ParticipantListComponent = (props) => {
  const { signalRService, toggle } = props;
  const [localConnections, setLocalConnections] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (signalRService) {
      signalRService.startConnection(null);
      signalRService.listenUpdateParticipants(updateParticipants);
    }
  }, [signalRService]);

  useEffect(() => {
    setIsOpened(props.isOpened);
  }, [props]);

  const toggleChild = (e) => {
    e.preventDefault();
    setIsOpened((prevOpened) => !prevOpened);
    toggle();
  };

  const updateParticipants = (users) => {
    console.log(users);
    setLocalConnections(users);
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
          <ul>
            {localConnections &&
              localConnections.map((user) => (
                <li key={user.uid}>{user.displayName}</li>
              ))}
          </ul>
        </section>
        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  );
};
