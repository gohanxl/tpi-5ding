/* eslint-disable */
import { close_caption } from "./ClosedCaption.module.scss";

import useSpeechToText from "react-hook-speech-to-text";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { SignalHandlerService } from "../services/signal-handler";

export const ClosedCaptionComponent = forwardRef((props, ref) => {
  const { name, meeting, signalRService } = props;

  const [closedCaptionReceive, setClosedCaptionReceive] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const { error, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      speechRecognitionProperties: { lang: "es-AR", interimResults: false },
    });

  useEffect(() => {
    async function initClosedCaption() {
      console.log("ENTRE AL USE EFFECT DE SIGNAL R!!!!!!");
      await signalRService.startConnection(null);
      await signalRService.listenReceiveClosedCaption(pushReceivedCC);
    }
    if (signalRService) {
      initClosedCaption();
    }
  }, [signalRService]);

  useEffect(() => {
    if (!isRecording) {
      console.log("PASO POR ACA XQ SE APAGO RECORDING!!!");
      startSpeechToText().catch((e) => {
        console.log(e);
      });
    }
  }, [isRecording]);

  if (error)
    return <p>Web Speech API no esta disponible en este navegador 🤷‍</p>;

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
    console.log("ACABO DE RECIBIR CC:");
    console.log(closedCaption);
    setClosedCaptionReceive(
      closedCaptionReceive.length < 3
        ? [...closedCaptionReceive, { name, closedCaption }]
        : [{ name, closedCaption }]
    );
  };

  if (
    !isMuted &&
    results.length &&
    signalRService &&
    signalRService.isServiceStarted
  ) {
    console.log("VOY A MANDAR ESTO:");
    const mensaje = results.pop();
    console.log(mensaje);
    signalRService.invokeSendClosedCaption(meeting, name, mensaje);
  }

  console.log("RERENDER AQUI!!!!!");
  console.log(isRecording);

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
