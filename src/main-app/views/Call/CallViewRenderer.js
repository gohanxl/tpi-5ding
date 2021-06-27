/* eslint-disable */
import React, { useEffect, useState } from "react";
import { VideoChat } from "../../modules/videocall/video-chat/VideoChat.component";
import { v4 } from "uuid";

export const CallViewRenderer = ({ currentUser }) => {
  const uuid = v4();
  const [userName, setUserName] = useState();

  useEffect(() => {
    if (currentUser && currentUser.dbUser) {
      setUserName(
        currentUser.dbUser.Nombre + " " + currentUser.dbUser.Apellido
      );
    }
  }, [currentUser]);

  return (
    <section style={{ height: "100%" }}>
      <VideoChat name={userName} uuid={uuid} meeting="1" />
    </section>
  );
};
