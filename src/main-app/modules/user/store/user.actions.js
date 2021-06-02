import * as types from "./user.types";

export const setCurrentUser = (user) => ({
  type: types.SET_CURRENT_USER,
  user,
});
