/* eslint-disable */
import { close_caption } from "./ClosedCaption.module.scss";

import useSpeechToText from "react-hook-speech-to-text";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export const ClosedCaptionComponent = forwardRef((props, ref) => {
  const { name, meeting, signalRService } = props;

  const [closedCaptionReceive, setClosedCaptionReceive] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const { error, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      timeout: 10000,
      speechRecognitionProperties: { lang: "es-AR", interimResults: false },
    });

  if (error)
    return <p>Web Speech API no esta disponible en este navegador 🤷‍</p>;

  useEffect(() => {
    startSpeechToText().catch((e) => {
      console.log(e);
    });
  }, []);

  useImperativeHandle(ref, () => ({
    async muteClosedCaption() {
      stopSpeechToText();
      setIsMuted(true);
    },
    async unMuteClosedCaption() {
      await startSpeechToText();
      setIsMuted(false);
    },
    async endCloseCaption() {
      stopSpeechToText();
    },
  }));

  const pushReceivedCC = (name, closedCaption) => {
    setClosedCaptionReceive(
      closedCaptionReceive.length < 3
        ? [...closedCaptionReceive, { name, closedCaption }]
        : [{ name, closedCaption }]
    );
  };

  if (signalRService && signalRService.isServiceStarted) {
    signalRService.listenReceiveClosedCaption(pushReceivedCC);
  }

  if (!isMuted && results.length) {
    signalRService.invokeSendClosedCaption(meeting, name, results.pop());
  }

  return (
    <div className={`${closedCaptionReceive.length ? close_caption : ""}`}>
      {closedCaptionReceive &&
        closedCaptionReceive.map(({ name, closedCaption }, index) => (
          <p key={index}>
            {name}: {closedCaption}
          </p>
        ))}
    </div>
  );
});
