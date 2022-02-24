import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from './../../constant';

export const appInfoSlice = createSlice({
  name: "appInfo",
  initialState: INITIAL_STATE,
  reducers: {
    setAppInfo: (state, action) => {
      state.appInfo = action.payload;
    },
    resetAppInfo: (state) => {
      state.appInfo = INITIAL_STATE.appInfo;
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    resetFilters: (state) => {
      state.filters = INITIAL_STATE.filters
    }
  },
});

export const { setAppInfo, resetAppInfo, setFilters, resetFilters } = appInfoSlice.actions;

export default appInfoSlice.reducer;