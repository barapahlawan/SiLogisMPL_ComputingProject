import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

// Ubah data notifikasi dari backend ke bentuk yang dipakai UI.
// Backend memakai field `sudahDibaca`, UI memakai `isRead`.
const normalisasi = (resData) => {
  const list = Array.isArray(resData) ? resData : resData ? [resData] : [];
  return list
    .filter((n) => n?.order) // abaikan notifikasi kosong (tanpa pesanan)
    .map((n) => ({ ...n, isRead: Boolean(n.sudahDibaca) }))
    .sort((a, b) => b.id - a.id); // terbaru di atas
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  // Sebelumnya berisi 5 notifikasi contoh (hardcode) -> badge Navbar selalu menampilkan angka palsu
  const [notifications, setNotifications] = useState([]);

  const refreshNotifications = useCallback(async () => {
    if (!localStorage.getItem('mpl_token')) {
      setNotifications([]);
      return;
    }
    try {
      const response = await api.get('/user/notifikasi');
      setNotifications(normalisasi(response.data?.data ?? response.data));
    } catch (err) {
      console.warn('Gagal memuat notifikasi:', err?.message);
    }
  }, []);

  // Ambil saat login, lalu perbarui tiap 30 detik. Kosongkan saat logout.
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return undefined;
    }
    refreshNotifications();
    const interval = setInterval(refreshNotifications, 30000);
    return () => clearInterval(interval);
  }, [user, refreshNotifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Simpan status "sudah dibaca" ke database
  const markAllAsRead = async () => {
    await api.patch('/user/notifikasi/read');
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true, sudahDibaca: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllAsRead, markAsRead, refreshNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
