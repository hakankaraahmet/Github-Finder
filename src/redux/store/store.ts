import { configureStore } from "@reduxjs/toolkit";
import repos from "../slices/githubSlices";

const store = configureStore({
  reducer: {
    repos,
  },
});

export default store;
