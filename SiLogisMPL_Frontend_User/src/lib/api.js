import axios from "axios";

// URL backend (Hugging Face). Bisa ditimpa lewat env var REACT_APP_BACKEND_URL di Vercel.
export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://rosa15-silogismpl-backend.hf.space";
export const API = `${BACKEND_URL}`;

export const api = axios.create({ baseURL: API });

// Halaman yang wajib login (sama dengan ProtectedRoute di App.js)
const HALAMAN_TERPROTEKSI = ["/pesanan", "/profil", "/notifikasi"];

// Pasang JWT otomatis, KECUALI untuk endpoint login/register
// (token lama yang sudah kedaluwarsa tidak boleh ikut terkirim saat login).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("mpl_token");
  const isAuthEndpoint = (config.url || "").startsWith("/auth/");
  if (token && !isAuthEndpoint) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Token kedaluwarsa / tidak valid (401) -> hapus sesi.
// Kalau sedang di halaman yang wajib login, arahkan ke /masuk.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && localStorage.getItem("mpl_token")) {
      localStorage.removeItem("mpl_token");
      localStorage.removeItem("mpl_user");
      window.dispatchEvent(new Event("mpl:logout")); // didengar AuthContext
      if (HALAMAN_TERPROTEKSI.includes(window.location.pathname)) {
        window.location.href = "/masuk";
      }
    }
    return Promise.reject(error);
  }
);
