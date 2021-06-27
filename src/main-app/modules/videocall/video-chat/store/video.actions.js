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

export const setCcOn = (ccOn) => ({
  type: types.SET_CC_ON,
  ccOn,
});

export const setLocalUserStream = (localUserStream) => ({
  type: types.SET_LOCAL_USER_STREAM,
  localUserStream,
});

export const setUserDisplayName = (userDisplayName) => ({
  type: types.SET_USER_DISPLAY_NAME,
  userDisplayName,
});

export const setLocalUserPeer = (localUserPeer) => ({
  type: types.SET_LOCAL_USER_PEER,
  localUserPeer,
});

export const setLocalUserId = (localUserId) => ({
  type: types.SETL_LOCAL_USER_ID,
  localUserId,
});

export const setLocalUserScreenSharingPeer = (localUserScreenSharingPeer) => ({
  type: types.SET_LOCAL_USER_SCREEN_SHARING_PEER,
  localUserScreenSharingPeer,
});

export const setLocalUserScreenSharingId = (localUserScreenSharingId) => ({
  type: types.SET_LOCAL_USER_SCREEN_SHARING_ID,
  localUserScreenSharingId,
});

export const setConnections = (connections) => ({
  type: types.SET_CONNECTIONS,
  connections,
});

export const setRemoteConnectionIds = (remoteConnectionIds) => ({
  type: types.SET_REMOTE_CONNECTIONS_ID,
  remoteConnectionIds,
});

export const setScreenSharingStatus = (
  isScreenSharingByRemote,
  isScreenSharingByMe
) => ({
  type: types.SET_SCREEN_SHARING_STATUS,
  isScreenSharingByRemote,
  isScreenSharingByMe,
});
