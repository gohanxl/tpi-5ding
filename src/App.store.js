import { configureStore } from "@reduxjs/toolkit";
import { homeReducer } from "./modules/home/store/home.reducer";

export default configureStore({
  reducer: {
    home: homeReducer,
  },
});
