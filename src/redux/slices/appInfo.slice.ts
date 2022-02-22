import { createSlice } from "@reduxjs/toolkit";
import { initialState } from './../../constant';

export const appInfoSlice = createSlice({
  name: "appInfo",
  initialState,
  reducers: {
    setAppInfo: (state, action) => {
      state.appInfo = action.payload;
    },
    resetAppInfo: (state) => {
      state = initialState;
    },
  },
});

export const { setAppInfo, resetAppInfo } = appInfoSlice.actions;

export default appInfoSlice.reducer;