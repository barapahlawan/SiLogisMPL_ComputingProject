import axios from "axios";

export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://rosa15-silogismpl-backend.hf.space";
export const API = `${BACKEND_URL}`;

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("mpl_token");
  const isAuthEndpoint = (config.url || "").startsWith("/auth/");
  if (token && !isAuthEndpoint) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && localStorage.getItem("mpl_token")) {
      localStorage.removeItem("mpl_token");
      localStorage.removeItem("mpl_user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
