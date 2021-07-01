/* eslint-disable */
import { close_caption } from "./ClosedCaption.module.scss";

import useSpeechToText from "react-hook-speech-to-text";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";

export const ClosedCaptionComponent = forwardRef((props, ref) => {
  const { name, meeting, signalRService } = props;

  const [closedCaptionReceive, setClosedCaptionReceive] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const ccOn = useSelector((state) => state.video.ccOn);

  const { error, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      speechRecognitionProperties: { lang: "es-AR", interimResults: false },
    });

  useEffect(() => {
    async function initClosedCaption() {
      await signalRService.startConnection(null);
      await signalRService.listenReceiveClosedCaption(pushReceivedCC);
    }
    if (signalRService) {
      initClosedCaption();
    }
  }, [signalRService]);

  useEffect(() => {
    const rejectDelay = (reason) => {
      return new Promise(function (resolve, reject) {
        setTimeout(reject.bind(null, reason), 1000);
      });
    };

    if (!isRecording) {
      let p = Promise.reject();
      for (let i = 0; i < 10; i++) {
        p = p.catch((err) => startSpeechToText()).catch(rejectDelay);
      }

      p.then(() => {
        console.log("ClosedCaption working properly.");
      }).catch((e) => {
        console.error(e);
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
    const mensaje = results.pop();
    console.log("VOY A ENVIAR ESTO: ");
    console.log(mensaje);
    signalRService.invokeSendClosedCaption(meeting, name, mensaje);
  }

  return (
    ccOn && (
      <div className={`${closedCaptionReceive.length ? close_caption : ""}`}>
        {closedCaptionReceive &&
          closedCaptionReceive.map(({ name, closedCaption }, index) => (
            <p key={index}>
              {name}: {closedCaption}
            </p>
          ))}
      </div>
    )
  );
});
