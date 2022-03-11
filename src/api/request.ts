import { axiosInstance } from "./config";

type BannerResponse = {
  banners: object[];
};

type RecommendResponse = {
  result: object[];
};

type HotSingerResponse = {
  artists: object[];
};

type TopRankResponse = {
  list: object[];
};

export const getBannerRequest = (type: number = 0) => {
  return axiosInstance.get<never, BannerResponse>(`/banner?type=${type}`);
};

export const getRecommendListRequest = (limit: number = 30) => {
  return axiosInstance.get<never, RecommendResponse>(
    `/personalized?limit=${limit}`
  );
};

export const getHotSingersRequest = (offset: number) => {
  return axiosInstance.get<never, HotSingerResponse>(
    `/top/artists?offset=${offset}`
  );
};

export const getSingersRequest = (
  type: number,
  area: number,
  initial: string,
  offset: number
) => {
  return axiosInstance.get<never, HotSingerResponse>(
    `/artist/list?type=${type}&area=${area}&initial=${initial}&offset=${offset}`
  );
};

export const getRankListRequest = () => {
  return axiosInstance.get<never, TopRankResponse>(`/toplist/detail`);
};
