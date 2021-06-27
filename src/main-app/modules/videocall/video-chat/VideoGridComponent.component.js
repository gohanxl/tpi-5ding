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
  const ccOn = useSelector((state) => state.video.ccOn);
  const isScreenSharingByRemote = useSelector(
    (state) => state.video.isScreenSharingByRemote
  );

  useEffect(() => {}, [videoRows, ccOn]);

  const CameraRow = ({ element }) => {
    return <div ref={(ref) => ref && ref.appendChild(element)} />;
  };

  return (
    <div className="cameras_container" id="video-container">
      {!isScreenSharingByRemote &&
        videoRows &&
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
