import axios, { /* AxiosInstance */ CreateAxiosDefaults } from "axios";

const defaultAxiosConfig: CreateAxiosDefaults<unknown> = {
  //baseURL: "http://172.20.10.11:3000",
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