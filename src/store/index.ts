import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "../application/Recommend/store/slice";

export const store = configureStore({
  reducer: {
    recommend: recommendReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
