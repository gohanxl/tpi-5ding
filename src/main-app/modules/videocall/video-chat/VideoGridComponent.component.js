/* eslint-disable */
import React, { useEffect, useState } from "react";
import { cameras_container } from "./VideoChat.module.scss";
import { useSelector } from "react-redux";

export const VideoGridComponent = (props) => {
  const videoRows = useSelector((state) => state.video.rows);

  useEffect(() => {}, [videoRows]);

  const CameraRow = ({ element }) => {
    return <div ref={(ref) => ref && ref.appendChild(element)} />;
  };

  return (
    <div className="cameras_container" id="video-container">
      {videoRows &&
        videoRows.map(({ divElement }, index) => {
          return <CameraRow key={index} element={divElement} />;
        })}
    </div>
  );
};
