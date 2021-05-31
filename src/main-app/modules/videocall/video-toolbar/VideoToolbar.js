/* eslint-disable */
import React from "react";

export const VideoToolbar = ({
  videoOnOff,
  muteUnmute,
  endCall,
  toggleChat,
}) => {
  return (
    <div className="buttons">
      <button
        className="button is-primary"
        id="videoOnButton"
        onClick={videoOnOff}
      >
        On/Stop Video
      </button>
      <button
        className="button is-danger"
        id="muteUnmuteButton"
        onClick={muteUnmute}
      >
        Mute/Unmute
      </button>
      <button className="button is-danger" id="endCallButton" onClick={endCall}>
        End Call
      </button>
      <button className="button is-info" onClick={toggleChat}>
        Chat
      </button>
    </div>
  );
};
