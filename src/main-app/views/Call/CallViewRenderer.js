/* eslint-disable */
import React from "react";
import { VideoChatComponent } from "../../modules/videocall/video-chat/VideoChatComponent";
import { ClosedCaptionComponent } from "../../modules/videocall/closed-caption/ClosedCaption.component";
import { v4 } from "uuid";

export const CallViewRenderer = () => {
  const uuid = v4();

  return (
    <section>
      <div>
        <VideoChatComponent name={uuid} meeting="1" />
      </div>
      <div>
        <ClosedCaptionComponent name={uuid} meeting="1" />
      </div>
    </section>
  );
};
