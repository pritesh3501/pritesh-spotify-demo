import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice.ts";

const store = configureStore({
  reducer: {
    global: globalSlice,
  },
});

export default store;
