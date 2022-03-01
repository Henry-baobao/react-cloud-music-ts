import { fromJS } from "immutable";
import {
  getBannerRequest,
  getRecommendListRequest,
} from "../../../api/request";
import * as actionTypes from "./constants";

type CreateChangeBannerAction = ReturnType<typeof createChangeBannerAction>;
type CreateChangeRecommendAction = ReturnType<
  typeof createChangeRecommendAction
>;

export type Actions = CreateChangeBannerAction | CreateChangeRecommendAction;

const createChangeBannerAction = (data: object[]) =>
  ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data),
  } as const);

const createChangeRecommendAction = (data: object[]) =>
  ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data),
  } as const);

export const getBannerList = () => {
  return async (dispatch) => {
    try {
      const res = await getBannerRequest();
      dispatch(createChangeBannerAction(res.data));
    } catch (error) {
      console.log("轮播图数据传输错误");
    }
  };
};

export const getRecommendList = () => {
  return async (dispatch) => {
    try {
      const res = (await getRecommendListRequest()) as any;
      dispatch(createChangeRecommendAction(res.result));
    } catch (error) {
      console.log("推荐歌单数据传输错误");
    }
  };
};
