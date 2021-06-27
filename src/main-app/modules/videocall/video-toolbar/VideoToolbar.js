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
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import {
  toolbar,
  toolbar_buttons,
  colorblind_button,
  is_danger,
} from "./VideoToolbar.module.scss";
import { ParticipantListComponent } from "../participant-list/ParticipantList.component";
import { useDispatch, useSelector } from "react-redux";
import { setCcOn } from "../video-chat/store/video.actions";

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
  const ccOn = useSelector((state) => state.video.ccOn);
  const isScreenSharingByMe = useSelector(
    (state) => state.video.isScreenSharingByMe
  );

  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {}, [micOn, videoOn, isScreenSharingByMe, ccOn]);

  const toggleParticipantModal = () => {
    signalRService.invokeUpdateParticipants(meetingId);
    setModalOpened((prevOpened) => !prevOpened);
  };

  const dispatch = useDispatch();

  return (
    <div className={toolbar}>
      <button
        className={`button ${colorblind_button} ${
          videoOn ? toolbar_buttons : is_danger
        }`}
        id="videoOnButton"
        onClick={videoOnOff}
      >
        <FontAwesomeIcon icon={videoOn ? faVideo : faVideoSlash} />
      </button>
      <button
        className={`button ${colorblind_button} ${
          micOn ? toolbar_buttons : is_danger
        }`}
        id="muteUnmuteButton"
        onClick={muteUnmute}
      >
        <FontAwesomeIcon icon={!micOn ? faMicrophoneSlash : faMicrophoneAlt} />
      </button>

      <button
        className={`button ${colorblind_button} ${
          ccOn ? toolbar_buttons : is_danger
        }`}
        id="videoOnButton"
        onClick={() => dispatch(setCcOn(!ccOn))}
      >
        <FontAwesomeIcon icon={faClosedCaptioning} />
      </button>

      <button
        className={`button ${colorblind_button} ${is_danger}`}
        id="endCallButton"
        onClick={endCall}
      >
        <FontAwesomeIcon icon={faPhoneSlash} />
      </button>

      <button
        className={`button ${toolbar_buttons} ${colorblind_button}`}
        onClick={toggleParticipantModal}
      >
        <FontAwesomeIcon icon={faUserFriends} />
      </button>
      {!isScreenSharingByMe && (
        <button
          className={`button ${toolbar_buttons} ${colorblind_button}`}
          id="start_screen_share_button"
          onClick={startShareScreen}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      {isScreenSharingByMe && (
        <button
          className={`button ${is_danger}`}
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
