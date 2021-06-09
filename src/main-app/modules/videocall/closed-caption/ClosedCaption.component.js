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
  const { name, meeting } = props;

  const [closedCaptionSend, setClosedCaptionSend] = useState(null);
  const [closedCaptionReceive, setClosedCaptionReceive] = useState(null);
  const [signalRService, setSignalRService] = useState();
  const { transcript } = useSpeechRecognition();
  const [isMuted, setIsMuted] = useState(false);

  useImperativeHandle(ref, () => ({
    async muteClosedCaption() {
      console.log("ACA MUTEO CC");
      await SpeechRecognition.abortListening();
      setIsMuted(true);
    },
    async unMuteClosedCaption() {
      console.log("ACA DESMUTEO CC");
      await SpeechRecognition.startListening({ language: "es-AR" });
      setIsMuted(false);
    },
  }));

  useEffect(() => {
    async function initSignalR() {
      const signalRServ = await SignalHandlerService.getInstance();
      const isConnected = await signalRServ.asyncConnection();
      console.log("SignalRHub Connected: " + isConnected);
      setSignalRService(signalRServ);
    }

    initSignalR();
  }, []);

  useEffect(() => {
    if (signalRService && signalRService.isServiceStarted) {
      console.log(closedCaptionReceive);
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
