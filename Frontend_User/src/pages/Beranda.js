import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Warehouse, Truck, PackageSearch } from 'lucide-react';

const Beranda = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <PackageSearch className="w-8 h-8 text-white" strokeWidth={2} />,
      title: 'Angkutan Berat',
      description: 'Transportasi kargo skala besar dengan armada heavy-duty yang dirawat rutin untuk performa maksimal.',
    },
    {
      icon: <Truck className="w-8 h-8 text-white" strokeWidth={2} />,
      title: 'Dalam Kota',
      description: 'Pengiriman cepat dan efisien untuk area urban dengan rute optimal guna menghindari kemacetan.',
    },
    {
      icon: <Warehouse className="w-8 h-8 text-white" strokeWidth={2} />,
      title: 'Gudang',
      description: 'Fasilitas penyimpanan sementara yang aman dengan sistem manajemen inventori yang presisi.',
    },
  ];

  const vehicles = [
    {
      label: 'KELAS BERAT',
      image: 'https://images.unsplash.com/photo-1559297434-fae8a10f6a98?q=80&w=800&auto=format&fit=crop',
      name: 'Pickup',
      capacity: '720 KG',
      type: 'MULTI-AXLE',
    },
    {
      label: 'AGILE PERKOTAAN',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop',
      name: 'Truck',
      capacity: '4.000 KG',
      type: 'BOX TERTUTUP',
    },
    {
      label: 'RANTAI DINGIN',
      image: 'https://images.unsplash.com/photo-1610491462702-42e6cef64376?q=80&w=800&auto=format&fit=crop',
      name: 'Fuso',
      capacity: '8.000 KG',
      type: 'TERMOSTAT',
    },
  ];

  const testimonials = [
    {
      stars: 5,
      text: '"Sistem tracking yang sangat akurat. LOGIS-CORE membantu kami menekan biaya operasional distribusi hingga 20% dalam 6 bulan pertama."',
      name: 'Budi Santoso',
      role: 'Manajer Logistik, PT Maju Jaya',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
    },
    {
      stars: 5,
      text: '"Layanan armada yang sangat terawat dan pengemudi yang profesional. Sangat merekomendasikan untuk pengiriman barang industri berat."',
      name: 'Siti Aminah',
      role: 'Direktur Operasional, Global Tech',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
    },
    {
      stars: 5,
      text: '"Integrasi API mereka sangat mulus dengan sistem inventori kami. Transparansi data yang diberikan benar-benar luar biasa."',
      name: 'Andi Wijaya',
      role: 'CTO, E-Logistics Indonesia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    },
  ];

  return (
    <div className="bg-white text-black font-['Manrope',_sans-serif] overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* BAGIAN KIRI: TEKS HERO */}
        <div className="space-y-8 z-10">
          <h1 className="text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight leading-[1.05]">
            <span className="text-[#F5BC00]">MANDIRI</span><br />
            <span className="text-black">PERKASA</span><br />
            <span className="text-[#F5BC00]">LOGISTIK</span>
          </h1>
          
          <p className="font-['Inter',_sans-serif] text-neutral-600 text-lg md:text-xl leading-relaxed max-w-xl">
            Solusi logistik terpercaya untuk pengiriman dalam kota maupun luar kota. 
            Kami memastikan armada kami selalu siap mendukung mobilitas bisnis Anda dengan presisi industri.
          </p>
          
          <div className="flex gap-12 pt-4">
            <div>
              <h3 className="text-[#F5BC00] text-4xl font-black mb-1">2+</h3>
              <p className="text-xs font-bold tracking-widest text-black uppercase">Tahun Berdiri</p>
            </div>
            <div>
              <h3 className="text-[#F5BC00] text-4xl font-black mb-1">????+</h3>
              <p className="text-xs font-bold tracking-widest text-black uppercase">Unit Armada</p>
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN: GAMBAR */}
        <div className="relative w-full flex justify-end">
          <div className="w-full max-w-[500px] h-[550px] rounded-[3rem] overflow-hidden shadow-xl bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=900"
              alt="Truck Pengiriman"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlapping Yellow Box */}
          <div className="absolute bottom-16 -left-8 md:-left-16 bg-[#F5BC00] text-white p-8 rounded-3xl shadow-lg w-[260px]">
            <div className="text-5xl font-black tracking-tight leading-none mb-2">100%</div>
            <div className="font-['Inter',_sans-serif] text-[13px] font-bold tracking-widest uppercase opacity-95">
              Aman & Terjamin
            </div>
          </div>

          <a
             href="https://wa.me/628123456789"
             target="_blank"
             rel="noreferrer"
             className="absolute -bottom-6 right-8 flex items-center group cursor-pointer z-50"
          >
             <div className="bg-[#E5E7EB] group-hover:bg-neutral-300 text-black font-bold text-sm py-4 pl-8 pr-12 rounded-xl shadow-md transition-all font-['Inter',_sans-serif]">
                Mulai Obrolan Langsung
             </div>
             <div className="absolute -right-4 bg-[#25D366] group-hover:bg-[#20ba5a] text-white p-3 rounded-full shadow-lg transition-transform group-hover:scale-105 flex items-center justify-center border-4 border-white">
                <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
             </div>
          </a>
        </div>
      </section>

      {/* 2. SIAPA KAMI SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-24">
        
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
          Siapa <span className="text-[#F5BC00]">Kami?</span>
        </h2>
        
        <p className="font-['Inter',_sans-serif] text-neutral-800 text-[15px] leading-relaxed max-w-5xl mb-6">
          PT Mandiri Perkasa Logistik adalah perusahaan jasa pengiriman dan distribusi barang yang berdiri sejak lebih dari satu dekade lalu. Berbasis di Sulawesi, kami melayani jaringan distribusi skala nasional dengan standar industri tertinggi.
        </p>
        <p className="font-['Inter',_sans-serif] text-neutral-800 text-[15px] leading-relaxed max-w-5xl mb-12">
          Dipercaya oleh ribuan mitra industri, kami mengintegrasikan teknologi LOGIS-CORE untuk memberikan transparansi data secara real-time, efisiensi rantai pasok, dan keamanan kargo tanpa kompromi.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="bg-[#FFFAEE] p-6 border-l-4 border-[#F5BC00]">
             <h4 className="font-bold text-black text-lg mb-1">Berdiri Sejak</h4>
             <p className="font-['Inter',_sans-serif] text-sm text-neutral-600">??????</p>
          </div>
          <div className="bg-[#FFFAEE] p-6 border-l-4 border-[#F5BC00]">
             <h4 className="font-bold text-black text-lg mb-1">Kantor Pusat</h4>
             <p className="font-['Inter',_sans-serif] text-sm text-neutral-600">??????</p>
          </div>
          <div className="bg-[#FFFAEE] p-6 border-l-4 border-[#F5BC00]">
             <h4 className="font-bold text-black text-lg mb-1">Teknologi</h4>
             <p className="font-['Inter',_sans-serif] text-sm text-neutral-600">Platform LOGIS-CORE dengan telemetri dan IoT terintegrasi</p>
          </div>
          <div className="bg-[#FFFAEE] p-6 border-l-4 border-[#F5BC00]">
             <h4 className="font-bold text-black text-lg mb-1">Armada</h4>
             <p className="font-['Inter',_sans-serif] text-sm text-neutral-600">??????</p>
          </div>
        </div>
      </section>

      {/* 3. VISI MISI & NILAI */}
      <section className="py-24 bg-white border-t border-neutral-200">
         <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
               Visi & <span className="text-[#F5BC00]">Misi</span>
            </h2>
            <div className="h-0.5 bg-[#F5BC00] w-full mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
               {/* Visi */}
               <div>
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-xl">
                        🎯
                     </div>
                     <span className="text-6xl font-black text-[#F5BC00]/40">01</span>
                  </div>
                  <h4 className="text-[#F5BC00] text-sm font-bold tracking-wider uppercase mb-2">Visi</h4>
                  <h3 className="text-3xl font-bold text-black mb-8 leading-tight">
                     Komitmen Kami dalam <br className="hidden md:block" /> Setiap Langkah
                  </h3>
                  <ul className="space-y-5">
                     {[
                        "Menyediakan armada kelas industri yang terawat dan berstandar keamanan tinggi",
                        "Menghadirkan teknologi LOGIS-CORE untuk transparansi dan efisiensi rantai pasok",
                        "Membangun SDM logistik yang profesional, terlatih, dan berorientasi layanan",
                        "Menekan biaya distribusi klien melalui optimasi rute dan manajemen armada cerdas",
                        "Memperluas jangkauan layanan ke seluruh wilayah strategis Indonesia"
                     ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 border-b border-neutral-100 pb-5">
                           <span className="text-black mt-1">→</span>
                           <span className="font-['Inter',_sans-serif] text-[14px] text-neutral-800">{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Misi */}
               <div>
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                        🚀
                     </div>
                     <span className="text-6xl font-black text-[#F5BC00]/40">02</span>
                  </div>
                  <h4 className="text-[#F5BC00] text-sm font-bold tracking-wider uppercase mb-2">Misi</h4>
                  <h3 className="text-3xl font-bold text-black mb-6 leading-tight">
                     Menjadi Tulang Punggung <br className="hidden md:block" /> Logistik Industri Indonesia
                  </h3>
                  <p className="font-['Inter',_sans-serif] text-neutral-800 text-[15px] leading-loose max-w-sm">
                     Menjadi perusahaan logistik paling dipercaya di Indonesia dengan membangun ekosistem distribusi yang efisien, terintegrasi, dan berkelanjutan — mendukung setiap mata rantai industri nasional dari Sabang sampai Merauke.
                  </p>
               </div>
            </div>

            {/* Nilai-Nilai Perusahaan */}
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-12">
               Nilai-Nilai <span className="text-[#F5BC00]">Perusahaan</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* 01 */}
               <div className="bg-[#F8F9FA] p-12 border-b-4 border-[#F5BC00]">
                  <div className="flex items-center gap-4 mb-6">
                     <span className="text-5xl font-black text-[#F5BC00]">01</span>
                     <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-4">Kepercayaan</h3>
                  <p className="font-['Inter',_sans-serif] text-sm text-neutral-600 leading-relaxed">
                     Membangun hubungan jangka panjang atas dasar kejujuran, transparansi, dan konsistensi dalam setiap janji layanan.
                  </p>
               </div>
               {/* 02 */}
               <div className="bg-[#F8F9FA] p-12 border-b-4 border-[#F5BC00]">
                  <div className="flex items-center gap-4 mb-6">
                     <span className="text-5xl font-black text-[#F5BC00]">02</span>
                     <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-4">Presisi</h3>
                  <p className="font-['Inter',_sans-serif] text-sm text-neutral-600 leading-relaxed">
                     Setiap pengiriman dieksekusi dengan ketepatan waktu dan akurasi data yang tak kompromi – presisi adalah standar kami.
                  </p>
               </div>
               {/* 03 */}
               <div className="bg-[#F8F9FA] p-12 border-b-4 border-[#F5BC00]">
                  <div className="flex items-center gap-4 mb-6">
                     <span className="text-5xl font-black text-[#F5BC00]">03</span>
                     <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-4">Kolaborasi</h3>
                  <p className="font-['Inter',_sans-serif] text-sm text-neutral-600 leading-relaxed">
                     Bermitra erat dengan klien, pengemudi, dan mitra industri untuk menciptakan solusi logistik yang saling menguntungkan.
                  </p>
               </div>
               {/* 04 */}
               <div className="bg-[#F8F9FA] p-12 border-b-4 border-[#F5BC00]">
                  <div className="flex items-center gap-4 mb-6">
                     <span className="text-5xl font-black text-[#F5BC00]">04</span>
                     <span className="text-2xl">🌱</span>
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-4">Inovasi</h3>
                  <p className="font-['Inter',_sans-serif] text-sm text-neutral-600 leading-relaxed">
                     Terus berinovasi melalui adopsi teknologi terkini, proses yang lebih cerdas, dan pengembangan SDM berkelanjutan.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 4. LAYANAN UNGGULAN */}
      <section className="py-24 bg-[#F2F4F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight mb-2">
                Layanan <span className="text-[#F5BC00]">Unggulan</span>
              </h2>
              <h3 className="text-3xl font-bold text-[#111111]">
                 Solusi Pengiriman Terintegrasi
              </h3>
            </div>
            <p className="font-['Inter',_sans-serif] text-neutral-700 max-w-sm text-[14px] leading-relaxed md:text-right pb-1">
              Kami menyediakan berbagai jenis angkutan yang disesuaikan dengan kebutuhan volume dan jarak tempuh Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-10 shadow-sm"
              >
                <div className="w-16 h-16 rounded-xl bg-[#F5BC00] flex items-center justify-center mb-8">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#111111] mb-4">{service.title}</h3>
                <p className="font-['Inter',_sans-serif] text-neutral-600 text-[14px] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. KENDARAAN KAMI SECTION */}
      <section className="pt-24 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1727] tracking-tight mb-4">
                Kendaraan Kami
              </h2>
              <p className="font-['Inter',_sans-serif] text-neutral-600 text-[15px] leading-relaxed">
                Aset kami dipelihara dengan presisi bedah, memastikan kargo Anda bergerak<br className="hidden md:block" /> dalam unit transportasi standar tertinggi yang tersedia di industri.
              </p>
            </div>
            <button
              onClick={() => navigate('/layanan')}
              className="flex items-center gap-4 bg-transparent border-none cursor-pointer group"
            >
              <span className="font-['Inter',_sans-serif] font-bold text-[13px] text-[#F5BC00] underline underline-offset-4 decoration-2 tracking-wider uppercase transition-colors">
                LIHAT SEMUA
              </span>
              <div className="w-10 h-10 rounded bg-[#F5BC00] flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-[#7A5B15] text-[#F5BC00] px-3 py-1 font-['Inter',_sans-serif] text-[9px] font-bold tracking-widest rounded-sm uppercase">
                    {vehicle.label}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#0B1727] mb-6">{vehicle.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-['Inter',_sans-serif] text-[10px] font-bold text-neutral-500 tracking-widest mb-1.5 uppercase">Kapasitas:</div>
                      <div className="font-['Inter',_sans-serif] text-[15px] font-bold text-[#0B1727]">{vehicle.capacity}</div>
                    </div>
                    <div>
                      <div className="font-['Inter',_sans-serif] text-[10px] font-bold text-neutral-500 tracking-widest mb-1.5 uppercase">Tipe:</div>
                      <div className="font-['Inter',_sans-serif] text-[15px] font-bold text-[#0B1727]">{vehicle.type}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="pt-16 pb-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          
          <span className="font-['Inter',_sans-serif] text-[10px] font-bold tracking-widest text-[#B58B00] bg-[#FFF8E5] border border-[#FDE499] px-4 py-1.5 rounded-full inline-block mb-6 uppercase">
            Bukti Kepercayaan
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#111111] tracking-tight mb-4">
            Apa Kata Mereka?
          </h2>
          
          <p className="font-['Inter',_sans-serif] text-neutral-500 max-w-2xl mx-auto mb-20 text-[18px] leading-relaxed">
            Ribuan mitra industri telah mengandalkan efisiensi LOGIS-CORE untuk rantai pasokan mereka. Inilah pengalaman mereka.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-left">
            {testimonials.map((t, index) => (
              <div key={index} className="flex flex-col">
                
                <div className="flex gap-1.5 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={24} className="text-[#F5BC00] fill-[#F5BC00]" />
                  ))}
                </div>
                
                <p className="font-['Inter',_sans-serif] text-[#111111] text-[16px] leading-relaxed mb-8 flex-grow">
                  {t.text}
                </p>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-14 h-14 rounded-full object-cover" 
                  />
                  <div>
                    <div className="font-bold text-[15px] text-[#111111]">{t.name}</div>
                    <div className="font-['Inter',_sans-serif] text-[13px] text-neutral-500 mt-0.5">{t.role}</div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Beranda;