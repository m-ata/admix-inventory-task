import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appInfoReducer from "./slices/appInfo.slice";

const rootReducer = combineReducers({
    appInfo: appInfoReducer
});

export const store = configureStore({
    reducer: rootReducer
});