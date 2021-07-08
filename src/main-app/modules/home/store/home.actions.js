import * as types from "./home.types";

export const increaseCounter = (increase) => ({
  type: types.INCREASE_COUNTER,
  increase,
});
