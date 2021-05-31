/* eslint-disable */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export const VideoToolbar = ({
  videoOnOff,
  muteUnmute,
  endCall,
  toggleChat,
}) => {
  let isMuted = false;
  let isVideoOn = true;

  const childMute = async () => {
    isMuted = !isMuted;
    if (isMuted) {
      document
        .getElementById("muteUnmuteButton")
        .classList.remove("is-primary");
      document.getElementById("muteUnmuteButton").classList.add("is-danger");
    } else {
      document.getElementById("muteUnmuteButton").classList.add("is-primary");
      document.getElementById("muteUnmuteButton").classList.remove("is-danger");
    }
    muteUnmute();
  };

  const childVideoOnOff = async () => {
    isVideoOn = !isVideoOn;
    if (!isVideoOn) {
      document.getElementById("videoOnButton").classList.remove("is-primary");
      document.getElementById("videoOnButton").classList.add("is-danger");
    } else {
      document.getElementById("videoOnButton").classList.add("is-primary");
      document.getElementById("videoOnButton").classList.remove("is-danger");
    }
    videoOnOff();
  };

  return (
    <div className="buttons">
      <button
        className="button is-primary"
        id="videoOnButton"
        onClick={childVideoOnOff}
      >
        <FontAwesomeIcon icon={faVideo} />
      </button>
      <button
        className="button is-primary"
        id="muteUnmuteButton"
        onClick={childMute}
      >
        <FontAwesomeIcon icon={faMicrophoneAlt} />
      </button>
      <button className="button is-danger" id="endCallButton" onClick={endCall}>
        <FontAwesomeIcon icon={faPhoneSlash} />
      </button>
      <button className="button is-info" onClick={toggleChat}>
        <FontAwesomeIcon icon={faComment} />
      </button>
    </div>
  );
};
