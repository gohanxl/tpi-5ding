/* eslint-disable */
import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClosedCaptioning,
  faMicrophoneAlt,
} from "@fortawesome/free-solid-svg-icons";
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

export const VideoToolbar = (props) => {
  const {
    videoOnOff,
    muteUnmute,
    endCall,
    closedCaption,
    setClosedCaption,
    signalRService,
    startShareScreen,
    stopSharingScreen,
    meetingId,
  } = props;

  const micOn = useSelector((state) => state.video.micOn);
  const videoOn = useSelector((state) => state.video.videoOn);
  const isScreenSharingByMe = useSelector(
    (state) => state.video.isScreenSharingByMe
  );

  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {}, [micOn, videoOn, isScreenSharingByMe]);

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

      <button
        className={`button ${closedCaption ? "is-primary" : "is-danger"}`}
        id="videoOnButton"
        onClick={() => setClosedCaption(!closedCaption)}
      >
        <FontAwesomeIcon icon={faClosedCaptioning} />
      </button>

      <button className="button is-danger" id="endCallButton" onClick={endCall}>
        <FontAwesomeIcon icon={faPhoneSlash} />
      </button>
      <button className="button is-info" onClick={toggleParticipantModal}>
        <FontAwesomeIcon icon={faUserFriends} />
      </button>
      {!isScreenSharingByMe && (
        <button
          className="button is-primary"
          id="start_screen_share_button"
          onClick={startShareScreen}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      {isScreenSharingByMe && (
        <button
          className="button is-danger"
          id="stop_screen_share_button"
          onClick={stopSharingScreen}
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
};
