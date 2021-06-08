import { SignalHandlerService } from "../services/signal-handler";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import React, { useEffect, useState } from "react";

export const ClosedCaptionComponent = (props) => {
  const { name, meeting } = props;

  const [closedCaptionSend, setClosedCaptionSend] = useState(null);
  const [closedCaptionReceive, setClosedCaptionReceive] = useState(null);
  const [signalRService, setSignalRService] = useState();
  const { transcript } = useSpeechRecognition();

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
  }, [signalRService]);

  if (SpeechRecognition.browserSupportsSpeechRecognition()) {
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
  } else {
    // TODO: Fallback behaviour
    // https://github.com/JamesBrill/react-speech-recognition/blob/HEAD/docs/POLYFILLS.md
    console.exception("browser not support speech recognition");
  }

  return (
    <p>
      {name}: {closedCaptionReceive}
    </p>
  );
};
