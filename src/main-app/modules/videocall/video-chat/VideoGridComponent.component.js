/* eslint-disable */
import React, { useEffect, useState } from "react";
import { cameras_container } from "./VideoChat.module.scss";

export const VideoGridComponent = ({ rows }) => {
  const [videoRows, setVideoRows] = useState(rows);

  useEffect(() => {
    setVideoRows(rows);
  }, [rows, videoRows]);

  const CameraRow = ({ element }) => {
    return <div ref={(ref) => ref && ref.appendChild(element)} />;
  };

  return (
    <div className="cameras_container" id="video-container">
      {rows &&
        rows.map(({ divElement }, index) => {
          return <CameraRow key={index} element={divElement} />;
        })}
    </div>
  );
};
