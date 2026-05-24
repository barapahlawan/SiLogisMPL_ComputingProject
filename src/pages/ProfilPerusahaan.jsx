import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { UploadCloud, Trash2, Check } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "siapa-kami", label: "Siapa Kami" },
  { id: "visi-misi", label: "Visi & Misi" },
  { id: "nilai", label: "Nilai" },
  { id: "layanan", label: "Layanan" },
  { id: "kendaraan", label: "Kendaraan" },
];

function SuccessModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <style>{`
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes drawCheck {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes popCircle {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        .check-line {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: drawCheck 0.4s ease 0.25s forwards;
        }
        .pop-circle {
          animation: popCircle 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .modal-box {
          animation: fadeScaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box"
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "52px 48px 44px",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 24,
          minWidth: 320,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}
      >
        <svg viewBox="0 0 100 100" width="100" height="100" style={{ overflow: "visible" }}>
          <circle
            cx="50" cy="50" r="46"
            fill="#f0fdf4" stroke="#22c55e" strokeWidth="3.5"
            className="pop-circle"
          />
          <polyline
            points="28,52 44,68 72,36"
            fill="none"
            stroke="#22c55e"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check-line"
          />
        </svg>

        <div style={{
          fontSize: 17, fontWeight: 800,
          color: "#111827", letterSpacing: 1,
          textAlign: "center",
        }}>
          PERUBAHAN BERHASIL
        </div>

        <button
          onClick={onClose}
          style={{
            background: "#FFA000", color: "#fff",
            border: "none", borderRadius: 8,
            padding: "10px 32px", fontSize: 14,
            fontWeight: 700, cursor: "pointer",
          }}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

export default function ProfilPerusahaan() {
  const [activeSection, setActiveSection] = useState("hero");
  const contentRef = useRef(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSection]);

  const handleSectionChange = (id) => {
    setActiveSection(id);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setShowSuccessModal(true);
      
      // Auto close after 2.5 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2500);
    }, 600);
  };

  const activeLabel = SECTIONS.find(s => s.id === activeSection)?.label || "";

  return (
    <div className="-m-8 flex flex-col h-screen overflow-hidden bg-[#FDFDF9]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200/70 bg-white shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-[14px]">
            <span className="text-gray-500">Company Profile</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="font-semibold text-gray-900">{activeLabel}</span>
          </div>
        </div>
      </header>

      {/* Content Body */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Inner Sidebar (Sections) */}
        <aside className="w-[200px] border-r border-gray-200/70 bg-[#FDFDF9] shrink-0 p-6 overflow-y-auto z-10">
          <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Sections</h3>
          <div className="space-y-1">
            {SECTIONS.map((sec) => {
              const isActive = sec.id === activeSection;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleSectionChange(sec.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-white text-gray-900 border border-[#FFA000] shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <span>{sec.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FFA000]"></span>}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Form Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto bg-[#F4F4F0] p-8 pb-32">
          <div className="max-w-[1100px] mx-auto space-y-8">
            {activeSection === "hero" && <HeroForm />}
            {activeSection === "siapa-kami" && <SiapaKamiForm />}
            {activeSection === "visi-misi" && <VisiMisiForm />}
            {activeSection === "nilai" && <NilaiForm />}
            {activeSection === "layanan" && <LayananForm />}
            {activeSection === "kendaraan" && <KendaraanForm />}
          </div>
        </div>
        
        {/* Footer Actions inside the content area to not block the bottom of the screen */}
        <div className="absolute bottom-0 left-[200px] right-0 flex items-center justify-end px-8 py-4 border-t border-gray-200/70 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-6 py-2 text-[13px] font-semibold text-white bg-[#E69000] hover:bg-[#CC8000] rounded-md transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPublishing ? "Memproses..." : "Publish Perubahan"}
            </button>
          </div>
        </div>

      </div>

      <SuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
}

function HeroForm() {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    headline1: "MANDIRI",
    headline2: "PERKASA",
    headline3: "LOGISTIK",
    tagline: "Solusi logistik terpercaya untuk pengiriman dalam kota maupun luar kota. Kami memastikan armada kami selalu siap mendukung mobilitas bisnis Anda dengan proses industri.",
    ctaText: "Hubungi Kami",
    stat1: "2x",
    statLabel1: "Lebih dari 2017",
    stat2: "971+",
    statLabel2: "Armada Aktif",
    badgeText: "100% TEPAT WAKTU",
    imgUrl: "",
    altText: "Armada truck Mandiri Perkasa Logistik"
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("imgUrl", file.name);
      toast.success(`Gambar ${file.name} dipilih!`);
    }
  };

  return (
    <>
      {/* Teks Hero Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[15px] font-bold text-gray-900">Teks Hero Banner</h2>
          <span className="text-[11px] font-semibold text-[#E69000] bg-[#FEF9E6] px-2.5 py-1 rounded-md">Above the Fold</span>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Headline Baris 1</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.headline1}
                onChange={(e) => handleChange("headline1", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Headline Baris 2</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.headline2}
                onChange={(e) => handleChange("headline2", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Headline Baris 3 (Warna Aksen)</label>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
              value={form.headline3}
              onChange={(e) => handleChange("headline3", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Tagline / Deskripsi Singkat</label>
            <textarea 
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000] resize-none"
              value={form.tagline}
              onChange={(e) => handleChange("tagline", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Teks Tombol CTA</label>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
              value={form.ctaText}
              onChange={(e) => handleChange("ctaText", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Statistik Hero */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6">Statistik Hero</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Angka Statistik 1</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[14px] font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.stat1}
                onChange={(e) => handleChange("stat1", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Label Statistik 1</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[14px] font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.statLabel1}
                onChange={(e) => handleChange("statLabel1", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Angka Statistik 2</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[14px] font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.stat2}
                onChange={(e) => handleChange("stat2", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Label Statistik 2</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[14px] font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.statLabel2}
                onChange={(e) => handleChange("statLabel2", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Teks Badge (misal: 100% TEPAT WAKTU)</label>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
              value={form.badgeText}
              onChange={(e) => handleChange("badgeText", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Gambar Hero */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6">Gambar Hero</h2>
        
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center py-12"
          >
            <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
            <span className="text-[13px] font-medium text-gray-600">Klik untuk upload gambar</span>
            <span className="text-[11px] text-gray-400 mt-1">PNG, JPG atau WEBP — maks 2MB — Rekomendasi 1200 x 800px</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Atau masukkan URL gambar</label>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
              placeholder="https://example.com/gambar-truck.jpg"
              value={form.imgUrl}
              onChange={(e) => handleChange("imgUrl", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Alt text (aksesibilitas & SEO)</label>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
              value={form.altText}
              onChange={(e) => handleChange("altText", e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function SiapaKamiForm() {
  const [form, setForm] = useState({
    judulSeksi: "Siapa Kami?",
    paragrafUtama: "PT Mandiri Perkasa Logistik adalah perusahaan jasa pengiriman dan distribusi barang yang berdiri sejak lebih dari satu dekade lalu. Berbasis di Sulawesi, kami melayani pengiriman dalam skala nasional dengan standar industri.",
    paragrafLanjutan: "Dipercaya oleh ribuan industri lokal, kami mengintegrasikan teknologi LOGIS-CORE untuk memonitor transparansi data secara real-time, efisien dan akurat. Pengelolaan biaya tanpa kompleksiti.",
    label1: "Berdiri Sejak",
    value1: "10/10",
    label2: "Teknologi",
    value2: "Platform LOGIS-CORE Mandiri di 27 antaraKota",
    label3: "Kantor Pusat",
    value3: "Makassar",
    label4: "Armada",
    value4: "Makassar"
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6">Siapa Kami</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Judul Seksi</label>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
              value={form.judulSeksi}
              onChange={(e) => handleChange("judulSeksi", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Paragraf Utama</label>
            <textarea 
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000] resize-none"
              value={form.paragrafUtama}
              onChange={(e) => handleChange("paragrafUtama", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Paragraf Lanjutan</label>
            <textarea 
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000] resize-none"
              value={form.paragrafLanjutan}
              onChange={(e) => handleChange("paragrafLanjutan", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6">Info Kilat (4 kolom)</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Label 1</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.label1}
                onChange={(e) => handleChange("label1", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Value 1</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.value1}
                onChange={(e) => handleChange("value1", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Label 2</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.label2}
                onChange={(e) => handleChange("label2", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Value 2</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.value2}
                onChange={(e) => handleChange("value2", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Label 3</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.label3}
                onChange={(e) => handleChange("label3", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Value 3</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.value3}
                onChange={(e) => handleChange("value3", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Label 4</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.label4}
                onChange={(e) => handleChange("label4", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Value 4</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.value4}
                onChange={(e) => handleChange("value4", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function VisiMisiForm() {
  const [activeTab, setActiveTab] = useState("visi");
  
  const [form, setForm] = useState({
    nomor: "01",
    judul: "Komitmen Kami dalam Setiap Langkah",
    poins: [
      { id: 1, text: "Menyediakan armada kelas satu yang terukur dan berstandar keamanan tinggi" },
      { id: 2, text: "Mendorong transparansi dan efisiensi dari seluruh nilai pemain" },
      { id: 3, text: "Mendorong 5.000 logistik yang profesional, terlatih, dan bersertifikasi" },
      { id: 4, text: "Memastikan biaya dasar 10am setiap hari melalui manajemen armada secara profesional" }
    ]
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handlePoinChange = (id, newText) => {
    setForm(prev => ({
      ...prev,
      poins: prev.poins.map(p => p.id === id ? { ...p, text: newText } : p)
    }));
  };

  const handleAddPoin = () => {
    setForm(prev => {
      const newId = prev.poins.length > 0 ? Math.max(...prev.poins.map(p => p.id)) + 1 : 1;
      return {
        ...prev,
        poins: [...prev.poins, { id: newId, text: "" }]
      };
    });
  };

  const handleRemovePoin = (id) => {
    setForm(prev => ({
      ...prev,
      poins: prev.poins.filter(p => p.id !== id)
    }));
  };

  const labelSufix = activeTab === "visi" ? "Visi" : "Misi";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-[15px] font-bold text-gray-900 mb-6">Visi & Misi</h2>
      
      <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab("visi")}
          className={`pb-3 text-[13px] transition-colors ${
            activeTab === "visi" 
              ? "font-semibold text-[#E69000] border-b-2 border-[#E69000]" 
              : "font-medium text-gray-400 hover:text-gray-600"
          }`}
        >
          Visi — 01
        </button>
        <button 
          onClick={() => setActiveTab("misi")}
          className={`pb-3 text-[13px] transition-colors ${
            activeTab === "misi" 
              ? "font-semibold text-[#E69000] border-b-2 border-[#E69000]" 
              : "font-medium text-gray-400 hover:text-gray-600"
          }`}
        >
          Misi — 02
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Nomor</label>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
              value={form.nomor}
              onChange={(e) => handleChange("nomor", e.target.value)}
            />
          </div>
          <div className="col-span-9">
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Judul {labelSufix}</label>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
              value={form.judul}
              onChange={(e) => handleChange("judul", e.target.value)}
            />
          </div>
        </div>

        <div className="pt-2">
          <h3 className="text-[12px] font-medium text-gray-400 mb-4">Poin-poin {labelSufix}</h3>
          <div className="space-y-4">
            {form.poins.map((poin, index) => (
              <div key={poin.id} className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-gray-400 mb-1.5">
                    Poin {labelSufix} {index + 1}
                  </label>
                  <input 
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                    value={poin.text}
                    onChange={(e) => handlePoinChange(poin.id, e.target.value)}
                    placeholder={`Masukkan poin ${labelSufix.toLowerCase()}...`}
                  />
                </div>
                <button
                  onClick={() => handleRemovePoin(poin.id)}
                  className="p-2 mb-[1px] text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Hapus Poin"
                >
                  <Trash2 className="w-[18px] h-[18px]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleAddPoin}
          className="flex items-center gap-2 mt-4 px-5 py-2 text-[13px] font-semibold text-[#E69000] border border-[#E69000] hover:bg-[#E69000] hover:text-white rounded-md transition-colors shadow-sm"
        >
          <span className="text-lg">+</span> Tambah Poin
        </button>
      </div>
    </div>
  );
}

function NilaiForm() {
  const [form, setForm] = useState({
    judulSeksi: "Nilai-Nilai Perusahaan",
    items: [
      { id: 1, nomor: "01", nama: "Kepercayaan", icon: "ti-shield-check", warna: "Amber (default)", desc: "Membangun hubungan klien melalui komitmen transparan dan terverifikasi dalam setiap layanan pelayanan." },
      { id: 2, nomor: "02", nama: "Presisi", icon: "ti-target", warna: "Teal", desc: "Setiap pengiriman dilakukan dengan ketepatan waktu dan akurasi data yang tak terkompromi." },
      { id: 3, nomor: "03", nama: "Kolaborasi", icon: "ti-users", warna: "Blue", desc: "Bersama mitra bisnis dan mitra industri untuk menciptakan solusi logistik yang menguntungkan bersama." },
      { id: 4, nomor: "04", nama: "Inovasi", icon: "ti-bulb", warna: "Green", desc: "Terus meningkatkan setiap teknologi, proses yang lebih canggih dan pengembangan SDM berkualitas." }
    ]
  });

  const handleTitleChange = (val) => setForm(prev => ({ ...prev, judulSeksi: val }));
  
  const handleItemChange = (idx, key, val) => {
    const newItems = [...form.items];
    newItems[idx][key] = val;
    setForm(prev => ({ ...prev, items: newItems }));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6">Nilai-Nilai Perusahaan</h2>
        <div>
          <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Judul Seksi</label>
          <input 
            type="text"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
            value={form.judulSeksi}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6 text-gray-300">Daftar Nilai</h2>
        
        <div className="space-y-10">
          {form.items.map((item, idx) => (
            <div key={item.id} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Nomor</label>
                  <input 
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                    value={item.nomor}
                    onChange={(e) => handleItemChange(idx, "nomor", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Nama Nilai</label>
                  <input 
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                    value={item.nama}
                    onChange={(e) => handleItemChange(idx, "nama", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Ikon (Tabler class)</label>
                  <input 
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                    value={item.icon}
                    onChange={(e) => handleItemChange(idx, "icon", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Warna Badge</label>
                  <input 
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                    value={item.warna}
                    onChange={(e) => handleItemChange(idx, "warna", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Deskripsi</label>
                <textarea 
                  rows={2}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000] resize-none"
                  value={item.desc}
                  onChange={(e) => handleItemChange(idx, "desc", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function KendaraanForm() {
  const [form, setForm] = useState({
    judulSeksi: "Kendaraan Kami",
    deskripsiPengantar: "Kami dibekali dengan produk berkualitas, memastikan cargo Anda bergerak dalam unit transportasi standar tertinggi yang tersedia di industri.",
    teksTombol: "Lihat Semua Armada",
    items: [
      { id: 1, jenis: "Pickup", kapasitas: "720 KG", tipe: "MULTI-AXLE", img: "https://..." },
      { id: 2, jenis: "Truck", kapasitas: "4.000 KG", tipe: "BOX TERTUTUP", img: "https://..." },
      { id: 3, jenis: "Fuso", kapasitas: "8.000 KG", tipe: "TERMOSTAT", img: "https://..." },
    ]
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleItemChange = (idx, key, val) => {
    const newItems = [...form.items];
    newItems[idx][key] = val;
    setForm(prev => ({ ...prev, items: newItems }));
  };

  const handleAddKendaraan = () => {
    setForm(prev => {
      const newId = prev.items.length > 0 ? Math.max(...prev.items.map(p => p.id)) + 1 : 1;
      return {
        ...prev,
        items: [...prev.items, { id: newId, jenis: "", kapasitas: "", tipe: "", img: "" }]
      };
    });
  };

  const handleRemoveKendaraan = (id) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter(p => p.id !== id)
    }));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6 text-gray-300">Header Seksi Kendaraan</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Judul Seksi</label>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
              value={form.judulSeksi}
              onChange={(e) => handleChange("judulSeksi", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Deskripsi Pengantar</label>
            <textarea 
              rows={2}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000] resize-none"
              value={form.deskripsiPengantar}
              onChange={(e) => handleChange("deskripsiPengantar", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Teks Tombol "Lihat Semua"</label>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
              value={form.teksTombol}
              onChange={(e) => handleChange("teksTombol", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6 text-gray-300">Daftar Kendaraan</h2>
        
        <div className="space-y-6">
          {form.items.map((item, idx) => (
            <div key={item.id} className="relative p-6 border border-gray-100 rounded-xl bg-gray-50/40 space-y-4 group transition-colors hover:border-[#FFA000]/30">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleRemoveKendaraan(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Hapus Kendaraan"
                >
                  <Trash2 className="w-[18px] h-[18px]" />
                </button>
              </div>

              <div className="grid grid-cols-12 gap-4 pr-10">
                <div className="col-span-5">
                  <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Jenis Kendaraan</label>
                  <input 
                    type="text"
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                    value={item.jenis}
                    onChange={(e) => handleItemChange(idx, "jenis", e.target.value)}
                  />
                </div>
                <div className="col-span-4">
                  <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Kapasitas</label>
                  <input 
                    type="text"
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                    value={item.kapasitas}
                    onChange={(e) => handleItemChange(idx, "kapasitas", e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Tipe Bak</label>
                  <input 
                    type="text"
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                    value={item.tipe}
                    onChange={(e) => handleItemChange(idx, "tipe", e.target.value)}
                  />
                </div>
              </div>
              <div className="pr-10">
                <label className="block text-[12px] font-medium text-gray-400 mb-1.5">URL Foto Kendaraan</label>
                <input 
                  type="text"
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                  value={item.img}
                  onChange={(e) => handleItemChange(idx, "img", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleAddKendaraan}
          className="flex items-center gap-2 mt-8 px-5 py-2 text-[13px] font-semibold text-[#E69000] border border-[#E69000] hover:bg-[#E69000] hover:text-white rounded-md transition-colors shadow-sm"
        >
          <span className="text-lg">+</span> Tambah Kendaraan
        </button>
      </div>
    </>
  );
}

function LayananForm() {
  const [form, setForm] = useState({
    judulSeksi: "Layanan Unggulan",
    subJudul: "Solusi Pengiriman Terintegrasi",
    deskripsiSampingKanan: "Kami menyediakan berbagai jenis angkutan yang disesuaikan dengan kebutuhan volume dan jangkauan tanpa batas Anda.",
    items: [
      { id: 1, nama: "Angkutan Berat", icon: "ti-truck", desc: "Transportasi skala besar dengan armada heavy-duty yang dirancang untuk kinerja dan performa maksimal." },
      { id: 2, nama: "Dalam Kota", icon: "ti-map-pin", desc: "Pengiriman cepat dari dan ke seluruh area urban dengan rute optimal guna menghemat kapasitas." },
      { id: 3, nama: "Gudang", icon: "ti-building-warehouse", desc: "Fasilitas penyimpanan sementara yang aman dengan sistem manajemen inventory barang industri berat." },
    ]
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleItemChange = (idx, key, val) => {
    const newItems = [...form.items];
    newItems[idx][key] = val;
    setForm(prev => ({ ...prev, items: newItems }));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6 text-gray-300">Header Seksi Layanan</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Judul Seksi</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.judulSeksi}
                onChange={(e) => handleChange("judulSeksi", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Sub-judul</label>
              <input 
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                value={form.subJudul}
                onChange={(e) => handleChange("subJudul", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Deskripsi Samping Kanan</label>
            <textarea 
              rows={2}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000] resize-none"
              value={form.deskripsiSampingKanan}
              onChange={(e) => handleChange("deskripsiSampingKanan", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6 text-gray-300">Daftar Layanan</h2>
        
        <div className="space-y-10">
          {form.items.map((item, idx) => (
            <div key={item.id} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Nama Layanan</label>
                  <input 
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                    value={item.nama}
                    onChange={(e) => handleItemChange(idx, "nama", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Ikon (Tabler class)</label>
                  <input 
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000]"
                    value={item.icon}
                    onChange={(e) => handleItemChange(idx, "icon", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-400 mb-1.5">Deskripsi Layanan</label>
                <textarea 
                  rows={2}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FFA000] resize-none"
                  value={item.desc}
                  onChange={(e) => handleItemChange(idx, "desc", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}