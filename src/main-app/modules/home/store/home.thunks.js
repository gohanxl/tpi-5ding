import { increaseCounter } from "./home.actions";
import { getCounterValue } from "./home.selectors";

export const addToCounter = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const count = getCounterValue(state);

      dispatch(increaseCounter(count + 1));
    } catch (error) {
      console.log("addToCounter", error);
    }
  };
};
