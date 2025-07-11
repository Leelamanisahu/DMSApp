import { getToken } from "@/utils/securestore";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apis.allsoft.co/api/documentManagement",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
