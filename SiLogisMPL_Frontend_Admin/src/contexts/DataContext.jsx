import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../lib/api.js";
import { MOCK_ORDERS, MOCK_COMPANY, MOCK_PROFILE, MOCK_CHATBOT } from "../lib/mockData";

const DataContext = createContext(null);

// Helper untuk normalize order dari backend ke shape yang dipakai UI
function normalizeOrder(o) {
  const namaPengirim = o.namaPengirim || o.sender?.name || "";
  const namaPenerima = o.namaPenerima || o.receiver?.name || "";
  const initials = namaPengirim
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "??";

  const AVATAR_COLORS = [
    "bg-amber-100 text-amber-700",
    "bg-gray-200 text-gray-700",
    "bg-emerald-100 text-emerald-700",
    "bg-blue-100 text-blue-700",
    "bg-pink-100 text-pink-700",
  ];
  const avatarColor = AVATAR_COLORS[(o.id || 0) % AVATAR_COLORS.length];

  return {
    // identitas
    id: String(o.id),
    manifestId: o.manifestId || o.id,
    // tampilan tabel
    customer: namaPengirim,
    initials,
    avatarColor,
    phone: o.nomorTeleponPengirim || o.sender?.phone || "-",
    date: o.createdAt
      ? new Date(o.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
      : "-",
    destination: o.alamatTujuan || o.receiver?.address || "-",
    destLabel: namaPenerima,
    cargoType: o.jenisPaket || "-",
    weight: o.totalBerat ? `${o.totalBerat} Kg` : "-",
    // status
    status: o.status || "PENDING",
    deliveryStatus: o.deliveryStatus || "Diproses",
    verified: o.status === "ACCEPT" || o.status === "DONE" || o.verified || false,
    invoiceUploaded: o.invoiceUploaded || false,
    // detail verifikasi
    sender: {
      name: o.namaPengirim || o.sender?.name || "-",
      pic: o.picPengirim || o.sender?.pic || "-",
      phone: o.nomorTeleponPengirim || o.sender?.phone || "-",
    },
    receiver: {
      name: o.namaPenerima || o.receiver?.name || "-",
      pic: o.picPenerima || o.receiver?.pic || "-",
      phone: o.nomorTeleponPenerima || o.receiver?.phone || "-",
    },
    cargo: {
      title: o.jenisPaket || "-",
      weight: o.totalBerat ? `${o.totalBerat} KG` : "-",
      packageType: o.jenisPaket || "-",
      totalPackage: String(o.totalPaket || 1),
    },
    vehicle: {
      type: o.jenisKendaraan || "-",
      capacity: o.kapasitas ? `${o.kapasitas} Kg` : "-",
      image:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=300&fit=crop",
    },
    route: {
      pickup: {
        city: o.alamatAsal || "-",
        name: o.namaPengirim || "-",
        address: o.alamatAsal || "-",
      },
      dropoff: {
        city: o.alamatTujuan || "-",
        name: o.namaPenerima || "-",
        address: o.alamatTujuan || "-",
      },
    },
    driver: { name: "", plate: "" },
    // raw backend data (untuk keperluan lain)
    _raw: o,
  };
}

export const DataProvider = ({ children }) => {
  const [orders, setOrdersState] = useState([]);
  const [company, setCompany] = useState(MOCK_COMPANY);
  const [profile, setProfileState] = useState(MOCK_PROFILE);
  const [chatbot, setChatbot] = useState(MOCK_CHATBOT);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState(null);

  // ─── FETCH ORDERS ─────────────────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const res = await api.get("/order/");
      const raw = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.orders || [];
      setOrdersState(raw.map(normalizeOrder));
    } catch (err) {
      console.warn("fetchOrders gagal, pakai mock:", err?.message);
      setOrdersState(MOCK_ORDERS);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  // ─── FETCH DASHBOARD ───────────────────────────────────────────────────────
  const fetchDashboard = useCallback(async () => {
    try {
      const res = await api.get("/user/dashboard");
      setDashboardStats(res.data?.data || res.data);
    } catch (err) {
      console.warn("fetchDashboard gagal:", err?.message);
    }
  }, []);

  // ─── FETCH ADMIN PROFILE ───────────────────────────────────────────────────
  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.get("/user/admin/profile");
      const p = res.data?.data || res.data;
      if (p) {
        const mapped = {
          name: p.username || p.name || MOCK_PROFILE.name,
          role: p.jabatan || p.role || MOCK_PROFILE.role,
          email: p.email || MOCK_PROFILE.email,
          phone: p.noTelepon || p.phone || MOCK_PROFILE.phone,
          joinDate: p.joinDate || MOCK_PROFILE.joinDate,
          branch: p.branch || MOCK_PROFILE.branch,
        };
        setProfileState(mapped);
      }
    } catch (err) {
      console.warn("fetchProfile gagal, pakai mock:", err?.message);
    }
  }, []);

  // ─── FETCH COMPANY PROFILE ─────────────────────────────────────────────────
  const fetchCompany = useCallback(async () => {
    try {
      const res = await api.get("/user/admin/companyprofile");
      const c = res.data?.data || res.data;
      if (c) setCompany((prev) => ({ ...prev, ...c }));
    } catch (err) {
      console.warn("fetchCompany gagal, pakai mock:", err?.message);
    }
  }, []);

  // Fetch semua data saat pertama mount (hanya kalau ada token)
  useEffect(() => {
    const token = localStorage.getItem("mpl_token");
    if (!token) return;
    fetchOrders();
    fetchDashboard();
    fetchProfile();
    fetchCompany();
  }, [fetchOrders, fetchDashboard, fetchProfile, fetchCompany]);

  // ─── SETTERS ───────────────────────────────────────────────────────────────
  const setOrders = (val) => {
    setOrdersState(val);
  };

  const setProfile = (val) => {
    setProfileState(val);
  };

  const updateOrder = (id, patch) =>
    setOrdersState((prev) => prev.map((o) => (o.id === String(id) ? { ...o, ...patch } : o)));

  const verifyOrder = async (id, driver) => {
    // Panggil backend: PATCH /order/:id/Diproses (status verifikasi awal)
    try {
      await api.patch(`/order/${id}/Diproses`);
    } catch (err) {
      console.warn("verifyOrder API gagal, update lokal saja:", err?.message);
    }
    updateOrder(id, { verified: true, status: "Terverifikasi", deliveryStatus: "Diproses", driver });
  };

  const setInvoiceUploaded = async (id, file) => {
    // Upload file ke backend: POST /order/invoice/:id
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        await api.post(`/order/invoice/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (err) {
        console.warn("upload invoice API gagal, update lokal saja:", err?.message);
      }
    }
    updateOrder(id, { invoiceUploaded: true });
  };

  const setDeliveryStatus = async (id, deliveryStatus) => {
    // Panggil backend: PATCH /order/:id/:status
    try {
      await api.patch(`/order/${id}/${encodeURIComponent(deliveryStatus)}`);
    } catch (err) {
      console.warn("setDeliveryStatus API gagal, update lokal saja:", err?.message);
    }
    updateOrder(id, { deliveryStatus });
  };

  const resetData = () => {
    setOrdersState(MOCK_ORDERS);
    setCompany(MOCK_COMPANY);
    setProfileState(MOCK_PROFILE);
    setChatbot(MOCK_CHATBOT);
  };

  return (
    <DataContext.Provider
      value={{
        orders,
        company,
        profile,
        chatbot,
        dashboardStats,
        ordersLoading,
        setOrders,
        setCompany,
        setProfile,
        setChatbot,
        updateOrder,
        verifyOrder,
        setInvoiceUploaded,
        setDeliveryStatus,
        resetData,
        fetchOrders,
        fetchDashboard,
        fetchProfile,
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