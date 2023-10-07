import authReducer from "./authSlice";
import postsReducer from "./postsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: { auth: authReducer, posts: postsReducer },
});

export default store;
