import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "../application/Recommend/store/slice";
import singerReducer from "../application/Singers/store/slice";
import rankReducer from "../application/Rank/store/slice";

export const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singer: singerReducer,
    rank: rankReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
