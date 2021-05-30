/* eslint-disable */
import React from "react";
import { VideoChatComponent } from "../../modules/videocall/video-chat/VideoChatComponent";
import { v4 } from "uuid";

export const CallViewRenderer = () => {
  const uuid = v4();

  return (
    <section>
      <div>
        <VideoChatComponent name={"Chelo-" + uuid} meeting="1" />
      </div>
    </section>
  );
};
