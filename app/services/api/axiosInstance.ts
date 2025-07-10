import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apis.allsoft.co/api/documentManagement",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "your-auth-token"; // Replace with actual logic from context or storage

    // Only add token if required
    if (
      token &&
      !config.url?.includes("/generateOTP") &&
      !config.url?.includes("/validateOTP")
    ) {
      config.headers.token = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
