import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const initialNotifications = [
    {
      id: 1,
      type: 'delivery_update',
      title: 'Pesanan #MPL-2024-0887 dalam perjalanan',
      time: '2 jam lalu',
      description: 'Kargo Anda kini dalam perjalanan menuju Bandung. Estimasi tiba 24 Mei 2024. Driver: Hendra S. - +62 812-0011-2233',
      isRead: false,
      status: 'Dalam Perjalanan',
      truck: 'Truck Box - 3.500 kg',
      buttons: ['Lacak Sekarang', 'Hubungi Driver']
    },
    {
      id: 2,
      type: 'delivery_success',
      title: 'Pesanan #MPL-2024-0891 berhasil diterima',
      time: '2 hari lalu',
      description: 'Kargo Anda telah diterima di Surabaya pada 22 Mei 2024 pukul 14:32 WIB. Penerima: Rina W.',
      isRead: false,
      status: 'Terkirim',
      truck: 'Fuso 8T - 7.200 kg',
      location: 'Surabaya, Jawa Timur',
      buttons: ['Lihat Detail']
    },
    {
      id: 3,
      type: 'delivery_update',
      title: 'Pesanan #MPL-2024-0887 dalam perjalanan',
      time: '2 hari lalu',
      description: 'Kargo Anda kini dalam perjalanan menuju Bandung. Estimasi tiba 24 Mei 2024. Driver: Hendra S. - +62 812-0011-2233',
      isRead: false,
      status: 'Dalam Perjalanan',
      truck: 'Truck Box - 3.500 kg',
      buttons: ['Lacak Sekarang', 'Hubungi Driver']
    },
    {
      id: 4,
      type: 'delivery_success',
      title: 'Pesanan #MPL-2024-0874 berhasil terkirim',
      time: '14 Mei 2024',
      description: 'Kargo Pickup 680 kg telah diterima di Semarang, Jawa Tengah.',
      isRead: true,
      status: 'Terkirim',
      truck: 'Pickup - 680 kg',
      buttons: []
    },
    {
      id: 5,
      type: 'system_update',
      title: 'Pembaruan platform LOGIS-CORE',
      time: '10 Mei 2024',
      description: 'Fitur pelacakan real-time kini tersedia di portal Anda. Cek halaman Pesanan untuk melihat posisi kargo secara langsung.',
      isRead: true,
      status: 'Pembaruan Sistem',
      buttons: []
    }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
