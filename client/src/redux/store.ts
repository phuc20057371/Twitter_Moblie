import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { combineReducers } from "redux";
export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
  }),
  devTools: { name: "tweeter" },
});
