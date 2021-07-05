/* eslint-disable */
import React, { useEffect, useState } from "react";
import { cameras_container } from "./VideoChat.module.scss";
import { useSelector } from "react-redux";
import { ClosedCaptionComponent } from "../closed-caption/ClosedCaption.component";

export const VideoGridComponent = ({
  name,
  meeting,
  ccRef,
  signalRService,
}) => {
  const videoRows = useSelector((state) => state.video.rows);

  useEffect(() => {
    let root = document.documentElement;
    let gridContainer = document.getElementById("video-grid-container");
    let gridContainerHeight = gridContainer.clientHeight;

    let rowsCount = videoRows.length;
    let camerasMaxHeight = (gridContainerHeight / rowsCount) * 0.8;

    root.style.setProperty("--user_camera_max-height", camerasMaxHeight + "px");
  }, [videoRows]);

  const CameraRow = ({ element }) => {
    return <div ref={(ref) => ref && ref.appendChild(element)} />;
  };

  return (
    <div className={cameras_container} id="video-container">
      {videoRows &&
        videoRows.map(({ divElement }, index) => {
          return <CameraRow key={index} element={divElement} />;
        })}
      <ClosedCaptionComponent
        name={name}
        meeting={meeting}
        ref={ccRef}
        signalRService={signalRService}
      />
    </div>
  );
};
