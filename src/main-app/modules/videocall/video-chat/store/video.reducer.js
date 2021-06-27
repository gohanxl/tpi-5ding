import * as types from "./video.types";

const initialState = {
  rows: [],
  micOn: true,
  videoOn: true,
  ccOn: false,
  isScreenSharingByRemote: false,
  isScreenSharingByMe: false,
  localUserStream: null,
  userDisplayName: "",
  localUserPeer: null,
  localUserId: null,
  localUserScreenSharingPeer: null,
  connections: [],
};

export const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VIDEO_ROWS:
      return {
        ...state,
        rows: action.rows,
      };
    case types.SET_MIC_ON:
      return {
        ...state,
        micOn: action.micOn,
      };
    case types.SET_VIDEO_ON:
      return {
        ...state,
        videoOn: action.videoOn,
      };
    case types.SET_CC_ON:
      return {
        ...state,
        ccOn: action.ccOn,
      };
    case types.SET_LOCAL_USER_STREAM:
      return {
        ...state,
        localUserStream: action.localUserStream,
      };
    case types.SET_USER_DISPLAY_NAME:
      return {
        ...state,
        userDisplayName: action.userDisplayName,
      };
    case types.SET_LOCAL_USER_PEER:
      return {
        ...state,
        localUserPeer: action.localUserPeer,
      };
    case types.SETL_LOCAL_USER_ID:
      return {
        ...state,
        localUserId: action.localUserId,
      };
    case types.SET_LOCAL_USER_SCREEN_SHARING_PEER:
      return {
        ...state,
        localUserScreenSharingPeer: action.localUserScreenSharingPeer,
      };
    case types.SET_LOCAL_USER_SCREEN_SHARING_ID:
      return {
        ...state,
        localUserScreenSharingId: action.localUserScreenSharingId,
      };
    case types.SET_CONNECTIONS:
      return {
        ...state,
        connections: action.connections,
      };
    case types.SET_SCREEN_SHARING_STATUS:
      return {
        ...state,
        isScreenSharingByRemote: action.isScreenSharingByRemote,
        isScreenSharingByMe: action.isScreenSharingByMe,
      };
    default:
      return state;
  }
};
