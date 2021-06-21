import * as types from "./video.types";

const initialState = {
  rows: [],
  micOn: true,
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
    default:
      return state;
  }
};
