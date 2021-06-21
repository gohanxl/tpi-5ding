/* eslint-disable */
import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { toolbar_buttons } from "./VideoToolbar.module.scss";
import { ParticipantListComponent } from "../participant-list/ParticipantList.component";
import { useSelector } from "react-redux";

export const VideoToolbar = forwardRef((props, ref) => {
  const {
    videoOnOff,
    muteUnmute,
    endCall,
    signalRService,
    startShareScreen,
    stopSharingScreen,
    meetingId,
  } = props;

  const micOn = useSelector((state) => state.video.micOn);
  const videoOn = useSelector((state) => state.video.videoOn);
  const [isScreenShareOn, setIsScreenShareOn] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {}, [micOn, videoOn]);

  useImperativeHandle(ref, () => ({
    stopScreenShareFromBrowser() {
      setIsScreenShareOn(false);
    },
  }));

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

  const toggleParticipantModal = () => {
    signalRService.invokeUpdateParticipants(meetingId);
    setModalOpened((prevOpened) => !prevOpened);
  };

  return (
    <div className={toolbar_buttons}>
      <button
        className={`button ${videoOn ? "is-primary" : "is-danger"}`}
        id="videoOnButton"
        onClick={videoOnOff}
      >
        <FontAwesomeIcon icon={videoOn ? faVideo : faVideoSlash} />
      </button>
      <button
        className={`button ${micOn ? "is-primary" : "is-danger"}`}
        id="muteUnmuteButton"
        onClick={muteUnmute}
      >
        <FontAwesomeIcon icon={!micOn ? faMicrophoneSlash : faMicrophoneAlt} />
      </button>
      <button className="button is-danger" id="endCallButton" onClick={endCall}>
        <FontAwesomeIcon icon={faPhoneSlash} />
      </button>
      <button className="button is-info" onClick={toggleParticipantModal}>
        <FontAwesomeIcon icon={faUserFriends} />
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
      <ParticipantListComponent
        meetingId={meetingId}
        isOpened={modalOpened}
        signalRService={signalRService}
        toggle={toggleParticipantModal}
      />
    </div>
  );
});
