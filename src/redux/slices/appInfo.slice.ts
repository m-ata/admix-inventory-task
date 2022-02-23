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
      state.appInfo = initialState.appInfo;
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    }
  },
});

export const { setAppInfo, resetAppInfo, setFilters, resetFilters } = appInfoSlice.actions;

export default appInfoSlice.reducer;