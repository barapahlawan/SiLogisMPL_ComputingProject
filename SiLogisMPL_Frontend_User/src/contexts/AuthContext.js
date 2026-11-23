import React, { createContext, useState, useContext, useEffect } from 'react';
// 1. Pastikan jalur import 'api' ini sesuai dengan lokasi file konfigurasi Axios kamu
import { api } from '../lib/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek sesi login saat halaman di-refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('mpl_user');
    const token = localStorage.getItem('mpl_token');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('mpl_user');
      }
    }
    setLoading(false);

    // Dipanggil dari lib/api.js saat backend menjawab 401 (token habis/tidak valid)
    const handleForcedLogout = () => setUser(null);
    window.addEventListener('mpl:logout', handleForcedLogout);
    return () => window.removeEventListener('mpl:logout', handleForcedLogout);
  }, []);

  // ========================================================
  // FUNGSI LOGIN: Menembak Server Hugging Face
  // ========================================================
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password
      });

      const rawStringData = response.data?.data || '';

      let token = '';
      if (rawStringData && rawStringData.includes('ini tokennya = ')) {
        token = rawStringData.split('ini tokennya = ')[1].trim();
      } else if (typeof rawStringData === 'string' && rawStringData.startsWith('eyJ')) {
        token = rawStringData;
      }

      if (!token) {
        return { success: false, ok: false, message: 'Login gagal: token tidak diterima' };
      }

      // Decode JWT payload (format base64url) untuk ambil role
      let payload = {};
      try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        payload = JSON.parse(atob(base64));
      } catch {}

      // Web customer hanya untuk akun USER (akun admin login di panel admin)
      if (payload.role && payload.role !== 'USER') {
        return { success: false, ok: false, message: 'Akun admin hanya bisa login di panel admin' };
      }

      const userData = {
        email: payload.sub || email,
        name: payload.username || email,
        role: payload.role || 'USER',
      };

      localStorage.setItem('mpl_token', token);
      localStorage.setItem('mpl_user', JSON.stringify(userData));
      setUser(userData);

      return { success: true, ok: true };
    } catch (error) {
      console.error('Login Error:', error);
      const message = error.response?.data?.errors || error.response?.data?.message || 'Email atau password salah';
      return { success: false, ok: false, message };
    }
  };

  // ========================================================
  // FUNGSI REGISTER: Mengirim Data ke Server Hugging Face
  // ========================================================
  const register = async (name, email, password, confirmPassword) => {
    try {
      // Ini sudah mantap, tidak perlu diubah
      const response = await api.post('/auth/register', {
        username: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Register Error:", error);

      // BAGIAN INI YANG DIGANTI: Ambil dari error.response?.data?.errors terlebih dahulu
      const message = error.response?.data?.errors || error.response?.data?.message || 'Registrasi gagal, coba lagi nanti.';

      return { success: false, message };
    }
  };

  // ========================================================
  // FUNGSI LOGOUT
  // ========================================================
  const logout = () => {
    setUser(null);
    localStorage.removeItem('mpl_token');
    localStorage.removeItem('mpl_user');
  };

  // Dipakai halaman Profil: update data user sekaligus simpan ke localStorage (tidak hilang saat refresh)
  const updateUser = (updater) => {
    setUser((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (next) localStorage.setItem('mpl_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
