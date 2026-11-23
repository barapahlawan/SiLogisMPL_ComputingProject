import React, { useState, useEffect } from 'react';
import { Bell, Truck, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNotifications } from '../contexts/NotificationContext';

// Nilai status dari backend -> teks yang ditampilkan
const LABEL_STATUS = {
  'Diproses': 'Diproses',
  'Barang-Diambil': 'Barang Diambil',
  'Dalam-Perjalanan': 'Dalam Perjalanan',
  'Tiba-di-Tujuan': 'Tiba di Tujuan',
  'DONE': 'Selesai',
  'ONGOING': 'Diproses',
  'PENDING': 'Menunggu Verifikasi',
};
const labelStatus = (status) => LABEL_STATUS[status] || status || '-';
const isStatusJalan = (status) => ['Diproses', 'Barang-Diambil', 'Dalam-Perjalanan', 'ONGOING'].includes(status);
const isStatusSelesai = (status) => ['Tiba-di-Tujuan', 'DONE'].includes(status);

// "2026-11-24T08:15:00" -> "24 Nov 2026, 08:15"
const formatWaktu = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const Notifikasi = () => {
  // Data diambil dari NotificationContext supaya angka badge di Navbar selalu sama dengan halaman ini
  const { notifications, refreshNotifications, markAllAsRead: tandaiSemuaDibaca } = useNotifications();
  const [loading, setLoading] = useState(true);

  // ── 1. AMBIL DATA NOTIFIKASI TERBARU DARI BACKEND ──
  useEffect(() => {
    refreshNotifications().finally(() => setLoading(false));
  }, [refreshNotifications]);

  // ── 2. LOGIKA INTERAKSI ──
  const unreadNotifs = notifications.filter(notif => !notif.isRead);
  const readNotifs = notifications.filter(notif => notif.isRead);
  const unreadCount = unreadNotifs.length;

  const markAllAsRead = async () => {
    try {
      await tandaiSemuaDibaca(); // disimpan ke database
      toast.success("Semua notifikasi ditandai telah dibaca");
    } catch (err) {
      toast.error(err.response?.data?.errors || "Gagal menandai notifikasi");
    }
  };

  const renderIcon = (status) => {
    if (isStatusJalan(status)) {
      return <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#F5BC00]"><Truck size={20} /></div>;
    }
    if (isStatusSelesai(status)) {
      return <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div>;
    }
    return <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"><Bell size={20} /></div>;
  };

  const getStatusStyle = (status) => {
    if (isStatusJalan(status)) return 'text-[#F5BC00] bg-orange-50 border border-orange-200';
    if (isStatusSelesai(status)) return 'text-green-600 bg-green-50 border border-green-200';
    return 'text-gray-600 bg-gray-100 border border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-[#F9FAFB]">
        <Loader2 className="w-8 h-8 animate-spin text-[#F5BC00] mb-2" />
        <p className="text-sm text-gray-500">Sinkronisasi kotak masuk notifikasi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F9FAFB] pb-12 font-['Inter',_sans-serif]">
      {/* Page Title Header */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900 font-['Manrope',_sans-serif]">
            Notifikasi
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Section Header */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Bell className="text-gray-900" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 font-['Manrope',_sans-serif] flex items-center gap-3">
                Notifikasi
                {unreadCount > 0 && (
                  <span className="bg-[#F5BC00] text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h2>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-orange-50 hover:bg-orange-100 text-[#F5BC00] font-bold py-2.5 px-5 rounded-lg border border-orange-100 transition-colors text-sm"
              >
                Tandai Semua Dibaca
              </button>
            )}
          </div>

          {/* Filter Tab */}
          <div className="px-6 pt-2 flex gap-6 border-b border-gray-100">
            <button className="text-[#F5BC00] font-bold border-b-2 border-[#F5BC00] pb-3 flex items-center gap-2">
              Semua <span className="bg-[#F5BC00] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{notifications.length}</span>
            </button>
          </div>

          {/* Jika Tidak Ada Notifikasi Sama Sekali */}
          {notifications.length === 0 && (
            <div className="p-12 text-center text-gray-500 text-sm">
              Belum ada pemberitahuan atau info manifest untuk Anda.
            </div>
          )}

          {/* Unread Section */}
          {unreadNotifs.length > 0 && (
            <div>
              <div className="bg-[#F5F5F0] px-6 py-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Baru • {unreadNotifs.length} Belum Dibaca</span>
              </div>
              <div className="divide-y divide-gray-100">
                {unreadNotifs.map(notif => {
                  // Ekstrak data order dari dalam object response BE
                  const orderData = notif?.order || {};
                  const orderNum = orderData?.orderNumber || orderData?.id || "-";
                  // Pakai status SAAT notifikasi dibuat; untuk notifikasi lama pakai status pesanan sekarang
                  const statusPengiriman = notif?.statusSaatItu || orderData?.statusPengiriman || orderData?.status || "PENDING";

                  return (
                    <div key={notif.id} className="p-6 flex gap-4 hover:bg-gray-50 transition-colors bg-white relative">
                      <div className="absolute top-8 left-3 w-2 h-2 bg-[#F5BC00] rounded-full"></div>
                      <div className="ml-2 mt-1">
                        {renderIcon(statusPengiriman)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                          <h3 className="font-bold text-gray-900 font-['Manrope',_sans-serif] text-base">
                            Pembaruan Status Manifest #{orderNum}
                          </h3>
                          <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{formatWaktu(notif?.createdAt) || "Baru saja"}</span>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                          Paket jenis <span className="font-semibold text-gray-900">"{orderData?.jenisPaket || '-'}"</span> tujuan <span className="font-semibold text-gray-900">{orderData?.alamatTujuan || '-'}</span> saat ini sedang dalam status <span className="text-[#F5BC00] font-medium">{labelStatus(statusPengiriman)}</span>.
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className={`text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1 ${getStatusStyle(statusPengiriman)}`}>
                            {isStatusSelesai(statusPengiriman) ? <CheckCircle2 size={12} /> : null}
                            {labelStatus(statusPengiriman).toUpperCase()}
                          </span>
                          {orderData?.jenisKendaraan && (
                            <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                              {orderData.jenisKendaraan}
                            </span>
                          )}
                          {orderData?.tipe && (
                            <span className="text-[11px] font-semibold text-gray-400 px-2 py-1">
                              Layanan: {orderData.tipe}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Read Section */}
          {readNotifs.length > 0 && (
            <div>
              <div className="bg-[#F5F5F0] px-6 py-2 border-y border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sebelumnya • Sudah Dibaca</span>
              </div>
              <div className="divide-y divide-gray-100">
                {readNotifs.map(notif => {
                  const orderData = notif?.order || {};
                  const orderNum = orderData?.orderNumber || orderData?.id || "-";
                  // Pakai status SAAT notifikasi dibuat; untuk notifikasi lama pakai status pesanan sekarang
                  const statusPengiriman = notif?.statusSaatItu || orderData?.statusPengiriman || orderData?.status || "PENDING";

                  return (
                    <div key={notif.id} className="p-6 flex gap-4 hover:bg-gray-50 transition-colors bg-white/60">
                      <div className="ml-4 mt-1 opacity-60">
                        {renderIcon(statusPengiriman)}
                      </div>
                      <div className="flex-1 opacity-80">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                          <h3 className="font-bold text-gray-900 font-['Manrope',_sans-serif] text-base">
                            Pembaruan Status Manifest #{orderNum}
                          </h3>
                          <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{formatWaktu(notif?.createdAt) || "Sebelumnya"}</span>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                          Paket jenis <span className="font-semibold text-gray-900">"{orderData?.jenisPaket || '-'}"</span> tujuan <span className="font-semibold text-gray-900">{orderData?.alamatTujuan || '-'}</span> saat ini sedang dalam status <span className="font-medium">{labelStatus(statusPengiriman)}</span>.
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${getStatusStyle(statusPengiriman)}`}>
                            {labelStatus(statusPengiriman).toUpperCase()}
                          </span>
                          {orderData?.jenisKendaraan && (
                            <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                              {orderData.jenisKendaraan}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Load More */}
          <div className="p-6 border-t border-gray-100 text-center">
            <button className="text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 py-2.5 px-6 rounded-lg transition-colors">
              ▼ Muat Lebih Banyak
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Notifikasi;
