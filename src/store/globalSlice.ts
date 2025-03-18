import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxGlobalProps } from "../utils/constant";

const initialState: ReduxGlobalProps = {
  authData: "",
  playList: 0,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<string | undefined>) => {
      state.authData = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<number>) => {
      state.playList = action.payload;
    },
  },
});
export const { setAuthData, setPlaylist } = globalSlice.actions;

export default globalSlice.reducer;
