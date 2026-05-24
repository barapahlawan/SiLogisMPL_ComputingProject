import React, { useState, useRef } from 'react';
import { 
  Package, CheckCircle2, Star, Edit, MapPin, 
  Upload, Info, TrendingUp, Check, X
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

const Profil = () => {
  const { user } = useAuth();
  const [profileImg, setProfileImg] = useState(null);
  const fileInputRef = useRef(null);

  const nameParts = (user?.name || 'User').split(' ');
  const defaultNamaDepan = nameParts[0];
  const defaultNamaBelakang = nameParts.slice(1).join(' ');
  const initials = (nameParts[0]?.[0] || '') + (nameParts[1]?.[0] || '');

  const [formData, setFormData] = useState({
    namaDepan: defaultNamaDepan,
    namaBelakang: defaultNamaBelakang,
    email: user?.email || '',
    phone: user?.phone || '',
    perusahaan: 'PT Maju Jaya',
    jabatan: 'Manajer Logistik',
    npwp: '01.234.567.8-901.000',
    industri: 'Manufaktur',
    alamat: '',
    kota: 'Bekasi',
    provinsi: 'Jawa Barat',
    kodePos: '17520'
  });

  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
        toast.success('Foto profil berhasil diperbarui');
      };
      reader.readAsDataURL(file);
    }
  };

  const savePersonalInfo = () => {
    setIsEditingPersonalInfo(false);
    toast.success('Informasi pribadi berhasil disimpan');
  };

  const saveAddress = () => {
    setIsEditingAddress(false);
    toast.success('Alamat pengiriman berhasil disimpan');
  };

  const renderField = (label, name, value, isEditing, colSpan = 1) => (
    <div className={`md:col-span-${colSpan}`}>
      <label className="block text-xs font-semibold text-gray-500 mb-2">{label}</label>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          className="w-full bg-white text-gray-900 text-sm p-3.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#F5BC00] focus:ring-1 focus:ring-[#F5BC00] transition-colors shadow-sm"
        />
      ) : (
        <div className="w-full bg-[#F5F5F0] text-gray-700 text-sm p-3.5 rounded-lg border border-transparent min-h-[50px] flex items-center">
          {value || <span className="text-gray-400 italic">Belum diisi</span>}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F9FAFB] pb-12 font-['Inter',_sans-serif]">
      {/* Page Title */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900 font-['Manrope',_sans-serif]">
            Profil Saya
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-t-4 border-t-[#F5BC00]">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-[#F5BC00] mb-4">
              <Package size={20} />
            </div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Total Pesanan</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900 font-['Manrope',_sans-serif]">24</span>
              <span className="text-sm text-gray-500 mb-1">pesanan</span>
            </div>
            <p className="text-xs font-semibold text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp size={16} strokeWidth={3} /> +3 bulan ini
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-t-4 border-t-[#F5BC00]">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-[#F5BC00] mb-4">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Berhasil Terkirim</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900 font-['Manrope',_sans-serif]">21</span>
              <span className="text-sm text-gray-500 mb-1">kiriman</span>
            </div>
            <p className="text-xs font-semibold text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp size={16} strokeWidth={3} /> 87.5% success rate
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-t-4 border-t-[#F5BC00]">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-[#F5BC00] mb-4">
              <Star size={20} />
            </div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Bergabung Sejak</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900 font-['Manrope',_sans-serif]">2021</span>
            </div>
            <p className="text-xs font-semibold text-gray-500 mt-2">
              3 tahun bersama MPL
            </p>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-[#F6F5EE] rounded-xl p-8 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#F5BC00] flex items-center justify-center text-white text-3xl font-bold font-['Manrope',_sans-serif] overflow-hidden shadow-md border-4 border-white">
                {profileImg ? (
                  <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  initials.toUpperCase()
                )}
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-[#F6F5EE] rounded-full"></div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-['Manrope',_sans-serif] mb-1">
                {formData.namaDepan} {formData.namaBelakang}
              </h2>
              <p className="text-sm text-gray-600 font-medium">{formData.jabatan} • {formData.perusahaan}</p>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/jpeg, image/png" 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors mb-2"
            >
              <Upload size={16} /> Ganti Foto
            </button>
            <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">JPG, PNG maks 2MB</p>
          </div>
        </div>

        {/* Informasi Pribadi */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-gray-100 gap-4">
            <h3 className="flex items-center gap-2 font-bold text-gray-900 font-['Manrope',_sans-serif]">
              <Info className="text-gray-400" size={20} /> Informasi Pribadi
            </h3>
            
            {isEditingPersonalInfo ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsEditingPersonalInfo(false)} 
                  className="flex items-center gap-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 text-xs font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <X size={14} /> Batal
                </button>
                <button 
                  onClick={savePersonalInfo} 
                  className="flex items-center gap-1 bg-[#F5BC00] hover:bg-[#dca900] text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <Check size={14} /> Simpan
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditingPersonalInfo(true)} 
                className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 px-4 rounded-lg transition-colors"
              >
                <Edit size={14} /> Edit
              </button>
            )}
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {renderField('Nama Depan', 'namaDepan', formData.namaDepan, isEditingPersonalInfo)}
              {renderField('Nama Belakang', 'namaBelakang', formData.namaBelakang, isEditingPersonalInfo)}
              {renderField('Email', 'email', formData.email, isEditingPersonalInfo)}
              {renderField('No. HP / WhatsApp', 'phone', formData.phone, isEditingPersonalInfo)}
              {renderField('Perusahaan', 'perusahaan', formData.perusahaan, isEditingPersonalInfo)}
              {renderField('Jabatan', 'jabatan', formData.jabatan, isEditingPersonalInfo)}
              {renderField('NPWP Perusahaan', 'npwp', formData.npwp, isEditingPersonalInfo)}
              {renderField('Industri', 'industri', formData.industri, isEditingPersonalInfo)}
            </div>
          </div>
        </div>

        {/* Alamat Pengiriman */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-gray-100 gap-4">
            <h3 className="flex items-center gap-2 font-bold text-gray-900 font-['Manrope',_sans-serif]">
              <MapPin className="text-gray-400" size={20} /> Alamat Pengiriman
            </h3>
            
            {isEditingAddress ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsEditingAddress(false)} 
                  className="flex items-center gap-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 text-xs font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <X size={14} /> Batal
                </button>
                <button 
                  onClick={saveAddress} 
                  className="flex items-center gap-1 bg-[#F5BC00] hover:bg-[#dca900] text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <Check size={14} /> Simpan
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditingAddress(true)} 
                className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 px-4 rounded-lg transition-colors"
              >
                {formData.alamat ? <><Edit size={14} /> Edit Alamat</> : '+ Tambah Alamat'}
              </button>
            )}
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-6">
              {renderField('Alamat Lengkap', 'alamat', formData.alamat, isEditingAddress, 4)}
              {renderField('Kota', 'kota', formData.kota, isEditingAddress, 2)}
              {renderField('Provinsi', 'provinsi', formData.provinsi, isEditingAddress, 1)}
              {renderField('Kode Pos', 'kodePos', formData.kodePos, isEditingAddress, 1)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profil;
