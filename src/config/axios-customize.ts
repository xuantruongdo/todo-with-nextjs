import axios from "axios";

const baseUrl = process.env.BASE_URL;
const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error?.response?.data?.message || "An error occurred";
    return Promise.reject(errorMessage);
  }
);

export default instance;
