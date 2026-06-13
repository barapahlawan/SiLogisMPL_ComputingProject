import React from 'react';
import { MapPin, MessageSquare, Mail, ArrowRight, Clock, ShieldCheck, Send } from 'lucide-react';

const HubungiKami = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold font-['Manrope',_sans-serif] text-gray-900 mb-2">
              Hubungi Tim
            </h1>
            <h1 className="text-4xl sm:text-5xl font-bold font-['Manrope',_sans-serif] text-[#F5BC00] mb-6">
              Ekspert Kami.
            </h1>
            <p className="font-['Inter',_sans-serif] text-gray-600 mb-8 max-w-lg">
              Kami siap membantu mengoptimalkan rantai pasokan Anda. Dari
              pertanyaan teknis hingga kemitraan strategis, mari bicarakan solusi
              logistik Anda hari ini.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-[#F5BC00] hover:bg-[#F5BC00] text-white font-['Manrope',_sans-serif] font-medium py-3 px-6 rounded-md transition-colors">
                Mulai Kirim Sekarang <ArrowRight size={18} />
              </button>

            </div>
          </div>
          
          <div className="relative">
            {/* Placeholder untuk gambar truk sesuai desain */}
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070" 
              alt="Armada Logistik" 
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            />
            {/* Badge Kuning */}
            <div className="absolute -bottom-6 -left-6 bg-[#F5BC00] text-white p-6 rounded-xl shadow-xl w-48 font-['Manrope',_sans-serif]">
              <h3 className="text-3xl font-bold mb-1">100%</h3>
              <p className="font-['Inter',_sans-serif] text-sm font-medium">AMAN & TERJAMIN</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Alamat */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#F5BC00] mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="font-['Manrope',_sans-serif] text-lg font-bold text-gray-900 mb-3">Alamat Kantor</h3>
            <p className="font-['Inter',_sans-serif] text-gray-500 text-sm mb-6 min-h-[40px]">
              Kawasan Industri Pulo Gadung,<br />Jakarta Timur, Indonesia
            </p>
            <a href="#" className="font-['Manrope',_sans-serif] text-[#F5BC00] text-sm font-medium flex items-center gap-1 hover:text-[#F5BC00]">
              Lihat di Peta <ArrowRight size={14} />
            </a>
          </div>

          {/* Card WhatsApp */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#F5BC00] mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-['Manrope',_sans-serif] text-lg font-bold text-gray-900 mb-3">WhatsApp Bisnis</h3>
            <p className="font-['Inter',_sans-serif] text-gray-500 text-sm mb-6 min-h-[40px]">
              Respon cepat untuk pertanyaan operasional dan armada.
            </p>
            <p className="font-['Inter',_sans-serif] font-bold text-gray-900">+62 811-4055-966</p>
          </div>

          {/* Card Email */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#F5BC00] mb-6">
              <Mail size={24} />
            </div>
            <h3 className="font-['Manrope',_sans-serif] text-lg font-bold text-gray-900 mb-3">Email Support</h3>
            <p className="font-['Inter',_sans-serif] text-gray-500 text-sm mb-6 min-h-[40px]">
              Kirimkan proposal atau dokumen resmi perusahaan Anda.
            </p>
            <p className="font-['Inter',_sans-serif] font-bold text-gray-900">support@logiledger.co.id</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[300px] bg-gray-200 relative overflow-hidden my-8">
        <iframe
          src="https://maps.google.com/maps?q=Kawasan%20Industri%20Pulo%20Gadung&t=&z=14&ie=UTF8&iwloc=&output=embed"
          className="absolute inset-0 w-full h-full border-0 grayscale mix-blend-multiply opacity-80 pointer-events-none"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Kami"
        ></iframe>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold font-['Inter',_sans-serif] text-gray-800 pointer-events-auto">
            <div className="w-3 h-3 bg-[#F5BC00] rounded-full"></div>
            Lokasi CV Mandiri Perkasa Logistik
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Info */}
          <div>
            <h2 className="font-['Manrope',_sans-serif] text-3xl font-bold text-gray-900 mb-4">Kirim Pesan Langsung</h2>
            <p className="font-['Inter',_sans-serif] text-gray-600 mb-10">
              Gunakan formulir ini untuk konsultasi khusus mengenai kebutuhan logistik CV Mandiri Perkasa Logistik. Tim admin kami akan merespon dalam 1x24 jam kerja.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-700">
                <Clock className="text-[#F5BC00]" size={24} />
                <span className="font-['Inter',_sans-serif] font-medium">Senin - Jumat: 08:00 - 17:00</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <ShieldCheck className="text-[#F5BC00]" size={24} />
                <span className="font-['Inter',_sans-serif] font-medium">Data Anda dienkripsi secara aman</span>
              </div>
            </div>
          </div>

          {/* The Form */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-['Inter',_sans-serif] block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="font-['Inter',_sans-serif] w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5BC00] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="font-['Inter',_sans-serif] block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Aktif</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="font-['Inter',_sans-serif] w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5BC00] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="font-['Inter',_sans-serif] block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Subjek</label>
                <input 
                  type="text" 
                  placeholder="Penawaran Kerja Sama" 
                  className="font-['Inter',_sans-serif] w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5BC00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="font-['Inter',_sans-serif] block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pesan Anda</label>
                <textarea 
                  rows="4"
                  placeholder="Tuliskan detail kebutuhan Anda..." 
                  className="font-['Inter',_sans-serif] w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5BC00] focus:border-transparent resize-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full flex items-center justify-center gap-2 bg-[#F5BC00] hover:bg-[#F5BC00] text-white font-['Manrope',_sans-serif] font-medium py-3.5 px-6 rounded-lg transition-colors"
              >
                Kirim Pesan <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HubungiKami;