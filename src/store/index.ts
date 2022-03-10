import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "../application/Recommend/store/slice";
import singerReducer from '../application/Singers/store/slice'

export const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singer: singerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
