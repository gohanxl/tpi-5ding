import * as types from "./home.types";

const initialState = {
  counter: 0,
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREASE_COUNTER:
      return {
        ...state,
        counter: action.increase,
      };
    case types.DECREASE_COUNTER:
      return {
        ...state,
        action,
      };
    case types.RESET_COUNTER:
      return {
        ...state,
        action,
      };
    default:
      return state;
  }
};
