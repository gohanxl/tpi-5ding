/* eslint-disable */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";

export const VideoToolbar = ({
  videoOnOff,
  muteUnmute,
  endCall,
  toggleChat,
  startShareScreen,
  stopSharingScreen,
}) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [isScreenShareOn, setIsScreenShareOn] = useState(false);

  const childMute = () => {
    setIsMute(!isMute);
    muteUnmute();
  };

  const childVideoOnOff = () => {
    setIsVideoOn(!isVideoOn);
    videoOnOff();
  };

  const childStartShareScreen = () => {
    if (isScreenShareOn) {
      return;
    }
    setIsScreenShareOn(true);
    startShareScreen();
  };

  const childSopShareScreen = () => {
    if (!isScreenShareOn) {
      return;
    }
    setIsScreenShareOn(false);
    stopSharingScreen();
  };

  return (
    <div className="buttons">
      <button
        className={`button ${isVideoOn ? "is-primary" : "is-danger"}`}
        id="videoOnButton"
        onClick={childVideoOnOff}
      >
        <FontAwesomeIcon icon={isVideoOn ? faVideo : faVideoSlash} />
      </button>
      <button
        className={`button ${!isMute ? "is-primary" : "is-danger"}`}
        id="muteUnmuteButton"
        onClick={childMute}
      >
        <FontAwesomeIcon icon={isMute ? faMicrophoneSlash : faMicrophoneAlt} />
      </button>
      <button className="button is-danger" id="endCallButton" onClick={endCall}>
        <FontAwesomeIcon icon={faPhoneSlash} />
      </button>
      <button className="button is-info" onClick={toggleChat}>
        <FontAwesomeIcon icon={faComment} />
      </button>
      {!isScreenShareOn && (
        <button
          className="button is-primary"
          id="start_screen_share_button"
          onClick={childStartShareScreen}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      {isScreenShareOn && (
        <button
          className="button is-danger"
          id="stop_screen_share_button"
          onClick={childSopShareScreen}
        >
          <FontAwesomeIcon icon={faStop} />
        </button>
      )}
    </div>
  );
};
