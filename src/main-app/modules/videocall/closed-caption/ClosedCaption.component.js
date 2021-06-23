/* eslint-disable react/display-name */
import { close_caption } from "./ClosedCaption.module.scss";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export const ClosedCaptionComponent = forwardRef((props, ref) => {
  const { name, meeting, signalRService } = props;

  const [closedCaptionSend, setClosedCaptionSend] = useState(null);
  const [closedCaptionReceive, setClosedCaptionReceive] = useState([]);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isMuted, setIsMuted] = useState(false);

  useImperativeHandle(ref, () => ({
    async muteClosedCaption() {
      //ACA MUTEO CC
      await SpeechRecognition.abortListening();
      setIsMuted(true);
    },
    async unMuteClosedCaption() {
      //ACA DESMUTEO CC
      await SpeechRecognition.startListening({ language: "es-AR" });
      setIsMuted(false);
    },
    async endCloseCaption() {
      await SpeechRecognition.abortListening();
      await resetTranscript();
    },
  }));

  useEffect(() => {
    if (signalRService) {
      signalRService.startConnection(null);
    }
  }, [signalRService]);

  const closeCaptionCallback = useCallback(
    (name, closedCaption) => {
      setClosedCaptionReceive(
        closedCaptionReceive.length < 2
          ? [...closedCaptionReceive, { name, closedCaption }]
          : [{ name, closedCaption }]
      );
    },
    [closedCaptionReceive]
  );

  useEffect(() => {
    if (signalRService && signalRService.isServiceStarted) {
      signalRService.listenReceiveClosedCaption(closeCaptionCallback);
    }
  }, [closeCaptionCallback, signalRService]);

  if (SpeechRecognition.browserSupportsSpeechRecognition()) {
    if (!isMuted) {
      SpeechRecognition.startListening({ language: "es-AR" });
      try {
        if (transcript && transcript !== closedCaptionSend) {
          setClosedCaptionSend(transcript);
        } else if (!transcript && closedCaptionSend) {
          signalRService.invokeSendClosedCaption(
            meeting,
            name,
            closedCaptionSend
          );
          setClosedCaptionSend(null);
        }
      } catch (e) {
        console.error(e);
      }
    }
  } else {
    console.error("browser not support speech recognition");
  }

  return (
    <div className={`${close_caption}`}>
      {closedCaptionReceive &&
        closedCaptionReceive.map(({ name, closedCaption }, index) => (
          <p key={index}>
            {name}: {closedCaption}
          </p>
        ))}
    </div>
  );
});
