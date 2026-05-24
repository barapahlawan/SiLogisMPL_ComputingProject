import { createContext, useContext, useEffect, useState } from "react";
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
  const [company, setCompany] = useState(() => load("mpl_company", MOCK_COMPANY));
  const [profile, setProfile] = useState(() => load("mpl_profile", MOCK_PROFILE));
  const [chatbot, setChatbot] = useState(() => load("mpl_chatbot", MOCK_CHATBOT));

  useEffect(() => localStorage.setItem("mpl_orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("mpl_company", JSON.stringify(company)), [company]);
  useEffect(() => localStorage.setItem("mpl_profile", JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem("mpl_chatbot", JSON.stringify(chatbot)), [chatbot]);

  const updateOrder = (id, patch) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const verifyOrder = (id, driver) =>
    updateOrder(id, { verified: true, status: "Terverifikasi", driver });

  const setInvoiceUploaded = (id) => updateOrder(id, { invoiceUploaded: true });

  const setDeliveryStatus = (id, deliveryStatus) => updateOrder(id, { deliveryStatus });

  const resetData = () => {
    localStorage.removeItem("mpl_orders");
    localStorage.removeItem("mpl_company");
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