import axios from "axios";

const baseUrl = process.env.BASE_URL;
const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    return error ?? Promise.reject(error);
  }
);

export default instance;
