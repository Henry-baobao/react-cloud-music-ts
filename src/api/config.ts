import axios, { AxiosInstance } from "axios";

export const BaseUrl = "http://localhost:5000";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BaseUrl,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => console.log(err, "网络错误")
);

//歌单一页限定歌曲数量
export const ONE_PAGE_COUNT = 50;
//顶部的高度
export const HEADER_HEIGHT = 45;

export { axiosInstance };
