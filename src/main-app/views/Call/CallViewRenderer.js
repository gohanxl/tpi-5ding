/* eslint-disable */
import React, { useEffect, useState } from "react";
import { VideoChat } from "../../modules/videocall/video-chat/VideoChat.component";
import { v4 } from "uuid";
import { ClosedCaptionComponent } from "../../modules/videocall/closed-caption/ClosedCaption.component";

export const CallViewRenderer = ({ currentUser }) => {
  const uuid = v4();
  const [userName, setUserName] = useState();

  useEffect(() => {
    if (currentUser && currentUser.dbUser) {
      setUserName(currentUser.dbUser.Nombre);
    }
  }, [currentUser]);

  return (
    <section>
      <div>
        <VideoChat name={userName} uuid={uuid} meeting="1" />
      </div>
      {/*<div>*/}
      {/*  <ClosedCaptionComponent name={userName} meeting="1" />*/}
      {/*</div>*/}
    </section>
  );
};
