/* eslint-disable */
import React, { useEffect, useState } from "react";
import { cameras_container } from "./VideoChat.module.scss";
import { useSelector } from "react-redux";
import { ClosedCaptionComponent } from "../closed-caption/ClosedCaption.component";
import { screen } from "@testing-library/react";

export const VideoGridComponent = ({
  name,
  meeting,
  ccRef,
  signalRService,
}) => {
  const videoRows = useSelector((state) => state.video.rows);
  const ccOn = useSelector((state) => state.video.ccOn);

  useEffect(() => {
    let root = document.documentElement;
    root.style.setProperty(
      "--user_camera-height",
      window.screen.height * 0.22 + "px"
    );
    root.style.setProperty(
      "--user_camera-width",
      window.screen.width * 0.15 + "px"
    );
    root.style.setProperty(
      "--chat_toolbar_height",
      window.screen.height * 0.715 + "px"
    );
  }, [videoRows, ccOn]);

  const CameraRow = ({ element }) => {
    return <div ref={(ref) => ref && ref.appendChild(element)} />;
  };

  return (
    <div className="cameras_container" id="video-container">
      {videoRows &&
        videoRows.map(({ divElement }, index) => {
          return <CameraRow key={index} element={divElement} />;
        })}
      {ccOn && (
        <ClosedCaptionComponent
          name={name}
          meeting={meeting}
          ref={ccRef}
          signalRService={signalRService}
        />
      )}
    </div>
  );
};
