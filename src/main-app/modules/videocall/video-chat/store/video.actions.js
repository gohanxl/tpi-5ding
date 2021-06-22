import * as types from "./video.types";

export const setVideoRows = (rows) => ({
  type: types.SET_VIDEO_ROWS,
  rows,
});

export const setMicOn = (micOn) => ({
  type: types.SET_MIC_ON,
  micOn,
});

export const setVideoOn = (videoOn) => ({
  type: types.SET_VIDEO_ON,
  videoOn,
});

export const setScreenSharingStatus = (
  isScreenSharingByRemote,
  isScreenSharingByMe
) => ({
  type: types.SET_SCREEN_SHARING_STATUS,
  isScreenSharingByRemote,
  isScreenSharingByMe,
});
