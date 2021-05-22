import * as types from "./user.types";

const initialState = {
  currentUser: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
      };
    default:
      return state;
  }
};
