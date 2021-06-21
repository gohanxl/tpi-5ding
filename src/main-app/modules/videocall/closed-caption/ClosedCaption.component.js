/* eslint-disable */
import { SignalHandlerService } from "../services/signal-handler";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export const ClosedCaptionComponent = forwardRef((props, ref) => {
  const { name, meeting, signalRService } = props;

  const [closedCaptionSend, setClosedCaptionSend] = useState(null);
  const [closedCaptionReceive, setClosedCaptionReceive] = useState(null);
  // const [signalRService, setSignalRService] = useState();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isMuted, setIsMuted] = useState(false);

  useImperativeHandle(ref, () => ({
    async muteClosedCaption() {
      await SpeechRecognition.abortListening();
      setIsMuted(true);
    },
    async unMuteClosedCaption() {
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

  useEffect(() => {
    if (signalRService && signalRService.isServiceStarted) {
      signalRService.listenReceiveClosedCaption(setClosedCaptionReceive);
    }
  }, [signalRService, isMuted]);

  if (SpeechRecognition.browserSupportsSpeechRecognition()) {
    if (!isMuted) {
      SpeechRecognition.startListening({ language: "es-AR" });

      try {
        if (transcript && transcript !== closedCaptionSend) {
          setClosedCaptionSend(transcript);
        } else if (!transcript && closedCaptionSend) {
          signalRService.invokeSendClosedCaption(meeting, closedCaptionSend);
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
    <p>
      {name}: {closedCaptionReceive}
    </p>
  );
});
