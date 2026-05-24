import React from 'react';
import { Bell, Truck, CheckCircle2, Circle } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

const Notifikasi = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  const unreadNotifs = notifications.filter(n => !n.isRead);
  const readNotifs = notifications.filter(n => n.isRead);

  const renderIcon = (type) => {
    switch (type) {
      case 'delivery_update':
        return <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#F5BC00]"><Truck size={20} /></div>;
      case 'delivery_success':
        return <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div>;
      case 'system_update':
        return <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Circle size={20} /></div>;
      default:
        return <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"><Bell size={20} /></div>;
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'Dalam Perjalanan') return 'text-[#F5BC00] bg-orange-50 border border-orange-200';
    if (status === 'Terkirim') return 'text-green-600 bg-green-50 border border-green-200';
    if (status === 'Pembaruan Sistem') return 'text-blue-600 bg-blue-50 border border-blue-200';
    return 'text-gray-600 bg-gray-100 border border-gray-200';
  };

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

          {/* Unread Section */}
          {unreadNotifs.length > 0 && (
            <div>
              <div className="bg-[#F5F5F0] px-6 py-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Baru • {unreadNotifs.length} Belum Dibaca</span>
              </div>
              <div className="divide-y divide-gray-100">
                {unreadNotifs.map(notif => (
                  <div key={notif.id} className="p-6 flex gap-4 hover:bg-gray-50 transition-colors bg-white relative">
                    <div className="absolute top-8 left-3 w-2 h-2 bg-[#F5BC00] rounded-full"></div>
                    <div className="ml-2 mt-1">
                      {renderIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                        <h3 className="font-bold text-gray-900 font-['Manrope',_sans-serif] text-base">{notif.title}</h3>
                        <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{notif.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${getStatusStyle(notif.status)}`}>
                          {status === 'Terkirim' ? <CheckCircle2 size={12} className="inline mr-1"/> : null}
                          {notif.status}
                        </span>
                        {notif.truck && (
                          <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                            {notif.truck}
                          </span>
                        )}
                        {notif.location && (
                          <span className="text-[11px] font-semibold text-gray-600 px-2 py-1">
                            {notif.location}
                          </span>
                        )}
                      </div>

                      {notif.buttons && notif.buttons.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {notif.buttons.map((btn, idx) => (
                            <button 
                              key={idx}
                              className={`text-xs font-bold py-2 px-4 rounded-md transition-colors ${
                                idx === 0 
                                  ? (btn === 'Lacak Sekarang' ? 'bg-[#F5BC00] hover:bg-[#dca900] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50')
                                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {btn}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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
                {readNotifs.map(notif => (
                  <div key={notif.id} className="p-6 flex gap-4 hover:bg-gray-50 transition-colors bg-white/60">
                    <div className="ml-4 mt-1 opacity-60">
                      {renderIcon(notif.type)}
                    </div>
                    <div className="flex-1 opacity-80">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                        <h3 className="font-bold text-gray-900 font-['Manrope',_sans-serif] text-base">{notif.title}</h3>
                        <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{notif.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${getStatusStyle(notif.status)}`}>
                          {notif.status}
                        </span>
                        {notif.truck && (
                          <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                            {notif.truck}
                          </span>
                        )}
                        {notif.location && (
                          <span className="text-[11px] font-semibold text-gray-600 px-2 py-1">
                            {notif.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
