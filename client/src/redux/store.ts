import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./reducers/loginReducer";
import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";
import { tweetRedudcer } from "./reducers/tweetReducer";
import { imageReducer } from "./reducers/imageReducer";
export const store = configureStore({
  reducer: combineReducers({
    login: loginReducer,
    user: userReducer,
    tweet: tweetRedudcer,
    imageAuthor: imageReducer
  }),
  devTools: { name: "tweeter" },
});
