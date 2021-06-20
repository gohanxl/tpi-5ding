import * as types from "./video.types";

export const setVideoRows = (rows) => ({
  type: types.SET_VIDEO_ROWS,
  rows,
});

export const setMicOn = (micOn) => ({
  type: types.SET_MIC_ON,
  micOn,
});
