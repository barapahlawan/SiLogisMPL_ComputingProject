import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("mpl_token");
    const stored = localStorage.getItem("mpl_user");
    if (token && stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        localStorage.removeItem("mpl_user");
      }
    }
    setLoading(false);
  }, []);

  const setUser = (updater) => {
    setUserState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem("mpl_user", JSON.stringify(next));
      return next;
    });
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const raw = res.data?.data || res.data;
      let token = null;

      if (typeof raw === "string") {
        const match = raw.match(/=\s*(eyJ[A-Za-z0-9._-]+)/);
        token = match ? match[1] : null;
      } else if (typeof raw === "object" && raw?.token) {
        token = raw.token;
      }

      if (!token) {
        return { ok: false, message: "Login gagal: token tidak diterima" };
      }

      let payload = {};
      try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        payload = JSON.parse(atob(base64));
      } catch {}

      if (payload.role !== "ADMIN") {
        return { ok: false, message: "Akun ini bukan akun admin" };
      }

      const userData = {
        email: payload.sub || email,
        name: payload.username || email,
        role: payload.role,
      };

      localStorage.setItem("mpl_token", token);
      localStorage.setItem("mpl_user", JSON.stringify(userData));
      setUserState(userData);
      return { ok: true };
    } catch (err) {
      const message =
        err?.response?.data?.errors ||
        err?.response?.data?.message ||
        "Email atau password salah";
      return { ok: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem("mpl_token");
    localStorage.removeItem("mpl_user");
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
