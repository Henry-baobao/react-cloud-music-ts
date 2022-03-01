import axios, { AxiosInstance } from "axios";

export const BaseUrl = "http://localhost:5000";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BaseUrl,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => console.log(err, "网络错误")
);

export { axiosInstance };
