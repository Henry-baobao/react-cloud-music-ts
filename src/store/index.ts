import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "../application/Recommend/store/slice";
import singerReducer from "../application/Singers/store/slice";
import rankReducer from "../application/Rank/store/slice";
import albumReducer from "../application/Album/store/slice";

export const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singer: singerReducer,
    rank: rankReducer,
    album: albumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
