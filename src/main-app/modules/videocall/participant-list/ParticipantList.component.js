/* eslint-disable */
import React, { useEffect, useState } from "react";

export const ParticipantListComponent = (props) => {
  const { meetingId, signalRService, connections } = props;
  const [localConnections, setLocalConnections] = useState([]);

  useEffect(() => {
    if (signalRService) {
      signalRService.startConnection(null);
      signalRService.listenUpdateParticipants(updateParticipants);
    }
  }, [signalRService]);

  const updateParticipants = (users) => {
    console.log("ACA TENGO Q UPDATEAR MI USER");
    console.log(users);
    setLocalConnections(users);
  };

  return (
    <div className="list_container">
      <ul>
        {localConnections &&
          localConnections.map((user) => (
            <li key={user.uuid}>{user.displayName}</li>
          ))}
      </ul>
    </div>
  );
};
