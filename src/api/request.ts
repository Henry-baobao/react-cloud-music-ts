import { axiosInstance } from "./config";

type BannerResponse = {
  banners: object[];
};

type RecommendResponse = {
  result: object[];
};

export const getBannerRequest = () => {
  return axiosInstance.get<never, BannerResponse>("/banner");
};

export const getRecommendListRequest = () => {
  return axiosInstance.get<never, RecommendResponse>("/personalized");
};
