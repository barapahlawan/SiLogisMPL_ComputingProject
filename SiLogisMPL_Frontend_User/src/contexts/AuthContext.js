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
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ========================================================
  // FUNGSI LOGIN: Menembak Server Hugging Face
  // ========================================================
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email: email,
        username: email,
        password: password
      });

      // 1. Ambil string text gabungan dari response.data.data atau response.data
      const responseBody = response.data;
      const rawStringData = responseBody.data; // Isinya: "Berhasil login sebagai USER ini tokennya = eyJhbGci..."

      let token = "";
      if (rawStringData && rawStringData.includes("ini tokennya = ")) {
        // 2. Potong string tepat setelah kata "ini tokennya = " untuk mengambil JWT-nya saja
        token = rawStringData.split("ini tokennya = ")[1].trim();
      } else {
        // Fallback jika suatu saat BE mengubah formatnya langsung jadi token murni
        token = rawStringData;
      }

      // 3. Karena BE belum mengirim objek data user secara detail saat login,
      // kita buatkan objek user lokal sementara dari email login agar aplikasi tidak crash
      const userData = {
        email: email,
        role: "USER"
      };

      // 4. Simpan ke Local Storage dengan key resmi proyekmu
      localStorage.setItem('mpl_token', token);
      localStorage.setItem('mpl_user', JSON.stringify(userData));

      setUser(userData);

      // Kembalikan status sukses ke komponen Login.jsx
      return { success: true, ok: true };
    } catch (error) {
      console.error("Login Error:", error);
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

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.agreed) {
    toast.error('Anda harus menyetujui syarat dan ketentuan yang berlaku.');
    return;
  }

  try {
    // 1. Ambil token JWT yang tersimpan di localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Sesi Anda telah habis, silakan login kembali.');
      navigate('/masuk');
      return;
    }

    // 2. Petakan formData React ke format JSON Backend yang kamu kirim tadi
    const payload = {
      jenisPaket: formData.jenisPaket,
      totalBerat: parseFloat(formData.beratEstimasi) || 0, // di React: beratEstimasi -> Backend: totalBerat
      totalPaket: parseInt(formData.totalPaket) || 0,
      namaPengirim: formData.pengirimNama,               // di React: pengirimNama -> Backend: namaPengirim
      alamatAsal: formData.pengirimAlamat,               // di React: pengirimAlamat -> Backend: alamatAsal
      picPengirim: formData.pengirimPIC,                 // di React: pengirimPIC -> Backend: picPengirim
      nomorTeleponPengirim: formData.pengirimTelp,       // di React: pengirimTelp -> Backend: nomorTeleponPengirim
      namaPenerima: formData.penerimaNama,               // di React: penerimaNama -> Backend: namaPenerima
      alamatTujuan: formData.penerimaAlamat,             // di React: penerimaAlamat -> Backend: alamatTujuan
      picPenerima: formData.penerimaPIC,                 // di React: penerimaPIC -> Backend: picPenerima
      nomorTeleponPenerima: formData.penerimaTelp,       // di React: penerimaTelp -> Backend: nomorTeleponPenerima
      jenisKendaraan: formData.kendaraan,               // di React: kendaraan -> Backend: jenisKendaraan
      tipe: "Reguler",                                   // Default sesuai JSON backend kamu
      kapasitas: 50,                                     // Default sesuai JSON backend kamu
      catatanTambahan: formData.catatan                  // di React: catatan -> Backend: catatanTambahan
    };

    // 3. Tembak ke endpoint /create milikmu
    const response = await axios.post('https://kingwither-silogismpl.hf.space/api/orders/create', payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // 4. Handle respons sukses
    if (response.status === 200 || response.status === 201) {
      toast.success('Pesanan berhasil dibuat!');
      setShowSuccessModal(true);
      if (onComplete) onComplete(response.data.data);
    }

  } catch (error) {
    console.error("Error creating order:", error);
    const errorMessage = error.response?.data?.errors || "Gagal membuat pesanan, silakan cek kembali data Anda.";
    toast.error(errorMessage);
  }
};