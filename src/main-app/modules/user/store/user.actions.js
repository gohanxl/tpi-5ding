import * as types from "./user.types";

export const setCurrentUser = (user) => ({
  type: types.SET_CURRENT_USER,
  user,
});

export const setIsColorBlind = (payload) => ({
  type: types.SET_IS_COLORBLIND,
  payload,
});
