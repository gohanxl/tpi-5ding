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
  const [closedCaptionReceive, setClosedCaptionReceive] = useState([]);
  const [signalRService, setSignalRService] = useState();
  const { transcript } = useSpeechRecognition();
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

  const setClosedCaptions = (name, closedCaption) => {
    setClosedCaptionReceive([...closedCaptionReceive, { name, closedCaption }]);
  };

  useEffect(() => {
    if (signalRService && signalRService.isServiceStarted) {
      signalRService.listenReceiveClosedCaption(setClosedCaptions);
    }
  }, [signalRService, isMuted]);

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
    closedCaptionReceive &&
    closedCaptionReceive.map(({ name, closedCaption }) => (
      <p>
        {name}: {closedCaption}
      </p>
    ))
  );
});
