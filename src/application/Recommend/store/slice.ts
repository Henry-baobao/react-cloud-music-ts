import { AppDispatch } from "./../../../store/index";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "react";
import {
  getBannerRequest,
  getRecommendListRequest,
} from "../../../api/request";

type RecommendState = {
  bannerList: object[];
  recommendList: object[];
};

type RecommendReducer = {
  saveBannerList: (state: RecommendState, action: PayloadAction<any>) => void;
  saveRecomendList: (state: RecommendState, action: PayloadAction<any>) => void;
  //   save: Reducer<RecommendState, PayloadAction<any>>;
};

const recommendSlice = createSlice<RecommendState, RecommendReducer>({
  name: "recommend",
  initialState: {
    bannerList: [],
    recommendList: [],
  },
  reducers: {
    // getBannerList: async (state, action) => {
    //   const res = await getBannerRequest(action.payload);
    //   state.bannerList = res.banners;
    // },

    // getRecommendList: async (state, action) => {
    //   const res = await getRecommendListRequest(action.payload);
    //   state.recommendList = res.result;
    // },
    saveBannerList: (state, action) => {
      console.log("save banner state: ", current(state), action);
      state.bannerList = action.payload;
    },

    saveRecomendList: (state, action) => {
      console.log("save recommend state: ", state, action);
      state.recommendList = action.payload;
    },
  },
});

export const getBannerListAsync =
  (payload: number) => async (dispatch: AppDispatch) => {
    try {
      const res = await getBannerRequest(payload);
      dispatch(saveBannerList(res.banners));
    } catch (error) {
      console.log("获取轮播图失败，请查看接口请求是否正常");
    }
  };

export const getRecommendListAsync =
  (payload: number) => async (dispatch: AppDispatch) => {
    try {
      const res = await getRecommendListRequest(payload);
      dispatch(saveRecomendList(res.result));
    } catch (error) {
      console.log("获取推荐歌单列表失败，请查看接口请求是否正常");
    }
  };

export const { saveBannerList, saveRecomendList } = recommendSlice.actions;

export default recommendSlice.reducer;
