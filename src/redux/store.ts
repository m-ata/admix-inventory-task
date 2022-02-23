import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appInfo.slice";

const rootReducer = combineReducers({
    app: appReducer
});

export const store = configureStore({
    reducer: rootReducer
});