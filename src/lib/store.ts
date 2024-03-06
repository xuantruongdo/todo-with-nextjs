import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import todoReducer from "./features/todo/todoSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    userReducer,
    todoReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;