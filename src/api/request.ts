import { axiosInstance } from "./config";

type BannerResponse = {
  banners: object[];
};

type RecommendResponse = {
  result: object[];
};

export const getBannerRequest = (type: number = 0) => {
  return axiosInstance.get<never, BannerResponse>(`/banner?type=${type}`);
};

export const getRecommendListRequest = (limit: number = 30) => {
  return axiosInstance.get<never, RecommendResponse>(
    `/personalized?limit=${limit}`
  );
};
