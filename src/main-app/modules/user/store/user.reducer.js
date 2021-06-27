import * as types from "./user.types";

const initialState = {
  currentUser: {},
  isColorBlind: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
      };
    case types.SET_IS_COLORBLIND:
      return {
        ...state,
        isColorBlind: action.payload,
      };
    default:
      return state;
  }
};
