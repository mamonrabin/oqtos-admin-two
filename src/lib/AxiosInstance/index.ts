import axios from "axios";

import * as config from "@/config";

export const AxiosInstance = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

console.log("Base URL:", AxiosInstance.defaults.baseURL);

AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
