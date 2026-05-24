import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// Demo credentials — replace with backend `/api/auth/login` later.
const DEMO_USER = {
  username: "admin",
  password: "admin123",
  profile: { id: "u-001", name: "Zuhri", role: "SENIOR DISPATCHER", email: "zuhri@mpllogistics.co.id" },
};

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("mpl_token");
    const stored = localStorage.getItem("mpl_user");
    if (token && stored) {
      setUserState(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // setUser yang juga sync ke localStorage supaya tidak hilang saat refresh
  const setUser = (updater) => {
    setUserState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem("mpl_user", JSON.stringify(next));
      return next;
    });
  };

  const login = async (username, password) => {
    await new Promise((r) => setTimeout(r, 600));
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      const token = "mock-jwt-" + btoa(`${username}:${Date.now()}`);
      localStorage.setItem("mpl_token", token);
      localStorage.setItem("mpl_user", JSON.stringify(DEMO_USER.profile));
      setUserState(DEMO_USER.profile);
      return { ok: true };
    }
    return { ok: false, message: "Username atau password salah" };
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