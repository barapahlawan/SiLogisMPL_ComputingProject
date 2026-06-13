import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../lib/api.js";
import { MOCK_ORDERS, MOCK_COMPANY, MOCK_PROFILE, MOCK_CHATBOT } from "../lib/mockData";

const DataContext = createContext(null);

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export const DataProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => load("mpl_orders", MOCK_ORDERS));
  const [company, setCompany] = useState(MOCK_COMPANY);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [profile, setProfile] = useState(() => load("mpl_profile", MOCK_PROFILE));
  const [chatbot, setChatbot] = useState(() => load("mpl_chatbot", MOCK_CHATBOT));

  useEffect(() => localStorage.setItem("mpl_orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("mpl_profile", JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem("mpl_chatbot", JSON.stringify(chatbot)), [chatbot]);

  // ─── FETCH COMPANY PROFILE dari backend ────────────────────────────────────
  // Endpoint ini tidak butuh autentikasi (public), tapi jika 403 coba pakai token
  const fetchCompany = useCallback(async () => {
    setCompanyLoading(true);
    try {
      let res;
      const token = localStorage.getItem("mpl_token");

      if (token) {
        // Coba endpoint user/companyprofile dengan token
        try {
          res = await api.get("/user/companyprofile");
        } catch {
          // Fallback ke admin endpoint jika token adalah admin
          res = await api.get("/user/admin/companyprofile");
        }
      } else {
        res = await api.get("/user/companyprofile");
      }

      const raw = res.data?.data || res.data;
      if (raw) {
        // Merge data backend ke dalam company state
        // Pakai nilai backend jika ada, fallback ke MOCK jika null
        setCompany(prev => ({
          ...prev,
          // Hero
          headline1: raw.headlineBaris1 || prev.headline1,
          headline2: raw.headlineBaris2 || prev.headline2,
          headline3: raw.headlineBaris3 || prev.headline3,
          tagline: raw.tagline || prev.tagline,
          ctaText: raw.teksTombolCTA || prev.ctaText,
          stat1: raw.angkaStatistik1 || prev.stat1,
          statLabel1: raw.labelStatistik1 || prev.statLabel1,
          stat2: raw.angkaStatistik2 || prev.stat2,
          statLabel2: raw.labelStatistik2 || prev.statLabel2,
          badgeText: raw.teksBadge || prev.badgeText,
          imgUrl: raw.urlGambarManual || raw.urlGambarOtomatis || prev.imgUrl,
          altText: raw.altText || prev.altText,
          // Siapa Kami
          judulSeksiSiapaKami: raw.judulSeksiSiapaKami || prev.judulSeksiSiapaKami,
          paragrafUtama: raw.paragrafUtama || prev.paragrafUtama,
          paragrafLanjutan: raw.paragrafLanjutan || prev.paragrafLanjutan,
          infoKilat: raw.infoKilat || prev.infoKilat,
          // Visi Misi
          judulVisi: raw.judulVisi || prev.judulVisi,
          judulMisi: raw.judulMisi || prev.judulMisi,
          noVisi: raw.noVisi || prev.noVisi,
          noMisi: raw.noMisi || prev.noMisi,
          poinVisi: raw.poinVisi || prev.poinVisi,
          poinMisi: raw.poinMisi || prev.poinMisi,
          // Nilai
          judulSeksiNilai: raw.judulSeksiNilai || prev.judulSeksiNilai,
          nilai: raw.nilai || prev.nilai,
          // Layanan
          judulSeksiLayanan: raw.judulSeksiLayanan || prev.judulSeksiLayanan,
          subJudulSeksiLayanan: raw.subJudulSeksiLayanan || prev.subJudulSeksiLayanan,
          deskripsiSampingKanan: raw.deskripsiSampingKanan || prev.deskripsiSampingKanan,
          layanan: raw.layanan || prev.layanan,
          // Kendaraan
          judulSeksiKendaraan: raw.judulSeksiKendaraan || prev.judulSeksiKendaraan,
          deskripsiPengantar: raw.deskripsiPengantar || prev.deskripsiPengantar,
          teksTombolLihatSemua: raw.teksTombolLihatSemua || prev.teksTombolLihatSemua,
          kendaraan: raw.kendaraan || prev.kendaraan,
        }));
      }
    } catch (err) {
      console.warn("fetchCompany gagal, pakai mock:", err?.message);
    } finally {
      setCompanyLoading(false);
    }
  }, []);

  // Fetch company profile saat pertama load (tidak perlu login)
  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  const updateOrder = (id, patch) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const verifyOrder = (id, driver) =>
    updateOrder(id, { verified: true, status: "Terverifikasi", driver });

  const setInvoiceUploaded = (id) => updateOrder(id, { invoiceUploaded: true });

  const setDeliveryStatus = (id, deliveryStatus) => updateOrder(id, { deliveryStatus });

  const resetData = () => {
    localStorage.removeItem("mpl_orders");
    localStorage.removeItem("mpl_profile");
    localStorage.removeItem("mpl_chatbot");
    setOrders(MOCK_ORDERS);
    setCompany(MOCK_COMPANY);
    setProfile(MOCK_PROFILE);
    setChatbot(MOCK_CHATBOT);
  };

  return (
    <DataContext.Provider
      value={{
        orders,
        company,
        companyLoading,
        profile,
        chatbot,
        setOrders,
        setCompany,
        setProfile,
        setChatbot,
        updateOrder,
        verifyOrder,
        setInvoiceUploaded,
        setDeliveryStatus,
        resetData,
        fetchCompany,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};