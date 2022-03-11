import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRankListRequest } from "../../../api/request";

type RankState = {
  rankList: object[];
  loading: boolean;
};

type RankReducer = {
  saveLoading: (state: RankState, action: PayloadAction<any>) => void;
  saveRankList: (state: RankState, action: PayloadAction<any>) => void;
};

const rankSlice = createSlice<RankState, RankReducer>({
  name: "rank",
  initialState: {
    rankList: [],
    loading: true,
  },
  reducers: {
    saveLoading: (state, action) => {
      state.loading = action.payload;
    },
    saveRankList: (state, action) => {
      state.rankList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRankListAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRankListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.rankList = action.payload;
      })
      .addCase(getRankListAsync.rejected, (state) => {
        state.loading = false;
        console.log("获取所有榜单排名列表失败");
      });
  },
});

export const getRankListAsync = createAsyncThunk<object[], void>(
  "rank/getRankListAsync",
  async (payload) => {
    const res = await getRankListRequest();
    return res.list;
  }
);

export const { saveLoading, saveRankList } = rankSlice.actions;
export default rankSlice.reducer;
