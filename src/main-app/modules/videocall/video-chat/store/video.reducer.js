import * as types from "./video.types";

const initialState = {
  rows: [],
};

export const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VIDEO_ROWS:
      return {
        ...state,
        rows: action.rows,
      };
    default:
      return state;
  }
};
