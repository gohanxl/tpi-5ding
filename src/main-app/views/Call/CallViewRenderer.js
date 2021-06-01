/* eslint-disable */
import React from "react";
import { VideoChat } from "../../modules/videocall/video-chat/VideoChat.component";
import { v4 } from "uuid";
import { ClosedCaptionComponent } from "../../modules/videocall/closed-caption/ClosedCaption.component";

export const CallViewRenderer = ({ currentUser }) => {
  const uuid = v4();
  const userName =
    currentUser && currentUser.dbUser ? currentUser.dbUser.Nombre : "";

  return (
    <section>
      <div>
        <VideoChat name={userName} uuid={uuid} meeting="1" />
      </div>
      <div>
        <ClosedCaptionComponent name={userName} meeting="1" />
      </div>
    </section>
  );
};
