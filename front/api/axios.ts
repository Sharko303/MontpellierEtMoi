import axios, { /* AxiosInstance */ CreateAxiosDefaults } from "axios";

const defaultAxiosConfig: CreateAxiosDefaults<unknown> = {
  baseURL: "http://localhost:3000",
};

export const axiosInstance = axios.create(defaultAxiosConfig);

/* axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 */