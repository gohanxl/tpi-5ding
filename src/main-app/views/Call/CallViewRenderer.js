/* eslint-disable */
import React, { useEffect, useState } from "react";
import { VideoChat } from "../../modules/videocall/video-chat/VideoChat.component";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { setUserDisplayName } from "../../modules/videocall/video-chat/store/video.actions";

export const CallViewRenderer = ({ currentUser }) => {
  const uuid = v4();
  const [userName, setUserName] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && currentUser.dbUser) {
      const userName =
        currentUser.dbUser.Nombre + " " + currentUser.dbUser.Apellido;
      dispatch(setUserDisplayName(userName));
      setUserName(userName);
    }
  }, [currentUser]);

  return (
    <section style={{ height: "100%" }}>
      <VideoChat name={userName} uuid={uuid} meeting="1" />
    </section>
  );
};
