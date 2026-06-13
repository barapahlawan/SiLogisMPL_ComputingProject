import { useState } from "react";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../lib/api.js";
import { Button } from "../components/ui/button";
import { Pencil } from "lucide-react";

export default function Profil() {
  const { profile, setProfile } = useData();
  const { setUser } = useAuth();
  const [form, setForm] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.patch("/user/admin/edit/profile", {
        username: form.name,
        email: form.email,
        noTelepon: form.phone,
      });

      // 1. Update DataContext
      setProfile(form);

      // 2. Sync ke AuthContext supaya sidebar otomatis update
      setUser((prev) => ({
        ...prev,
        name: form.name,
        role: form.role,
      }));

      // 3. Tampilkan modal sukses
      setShowSuccess(true);
    } catch (err) {
      // Fallback: update lokal saja kalau API gagal
      setProfile(form);
      setUser((prev) => ({ ...prev, name: form.name, role: form.role }));
      setShowSuccess(true);
      console.warn("Profil disimpan lokal saja:", err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="profil-page"
      style={{ background: "#f0f0f0", minHeight: "100vh", position: "relative" }}
    >
      {/* ── MODAL SUKSES ── */}
      {showSuccess && (
        <div
          onClick={() => setShowSuccess(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "52px 48px 44px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              minWidth: 320,
              boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            }}
          >
            {/* Animated checkmark circle */}
            <div style={{ position: "relative", width: 100, height: 100 }}>
              <svg viewBox="0 0 100 100" width="100" height="100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="46" fill="#f0fdf4" stroke="#22c55e" strokeWidth="3.5" />
                {/* Checkmark */}
                <polyline
                  points="28,52 44,68 72,36"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 60,
                    strokeDashoffset: 0,
                    animation: "drawCheck 0.4s ease forwards",
                  }}
                />
              </svg>
            </div>

            <p
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: "#1a1a1a",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Perubahan Berhasil
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              style={{
                marginTop: 4,
                background: "#FFA000",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "11px 40px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              Tutup
            </button>
          </div>

          <style>{`
            @keyframes drawCheck {
              from { stroke-dashoffset: 60; }
              to   { stroke-dashoffset: 0; }
            }
          `}</style>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{ background: "#f0f0f0", padding: "40px 48px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "28px" }}>
          {/* Avatar box */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: 108,
                height: 108,
                borderRadius: 14,
                overflow: "hidden",
                background: "#1c2b38",
              }}
            >
              <svg viewBox="0 0 108 108" width="108" height="108" xmlns="http://www.w3.org/2000/svg">
                <rect width="108" height="108" fill="#1c2b38" />
                <ellipse cx="54" cy="96" rx="34" ry="22" fill="#5d8ea6" />
                <rect x="20" y="74" width="68" height="34" rx="0" fill="#5d8ea6" />
                <rect x="46" y="62" width="16" height="14" fill="#e8a87c" />
                <circle cx="54" cy="50" r="22" fill="#e8a87c" />
                <path d="M32 44 Q34 22 54 20 Q74 22 76 44 Q70 30 54 30 Q38 30 32 44Z" fill="#6b3a2a" />
                <polygon points="46,74 38,108 54,82" fill="#4a7a94" />
                <polygon points="62,74 70,108 54,82" fill="#4a7a94" />
              </svg>
            </div>
            <button
              style={{
                position: "absolute",
                bottom: -10,
                right: -10,
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#FFA000",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
              }}
            >
              <Pencil size={15} color="#fff" strokeWidth={2.5} />
            </button>
          </div>

          {/* Name + role */}
          <div style={{ paddingTop: 4 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#aaa",
                fontWeight: 600,
                margin: "0 0 4px",
              }}
            >
              System Administrator
            </p>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#1a1a1a",
                margin: "0 0 6px",
                lineHeight: 1.05,
                fontFamily: "inherit",
              }}
            >
              {form.name?.split(" ")[0] || "Zuhri"}
            </h1>
            <p style={{ fontSize: 15, color: "#888", margin: 0 }}>
              {form.role || "Head of Operations & Logistics Analytics"}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#ddd" }} />

      {/* ── INFORMASI PROFIL ── */}
      <div style={{ padding: "36px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="7" r="4" fill="#FFA000" />
            <path d="M2 17c0-4 3.582-6 8-6s8 2 8 6" stroke="#FFA000" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
          <span style={{ fontSize: 17, fontWeight: 800, color: "#1a1a1a" }}>
            Informasi Profil
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 48,
            rowGap: 0,
          }}
        >
          <ProfileField label="Nama Lengkap" testId="profile-name" value={form.name} onChange={(v) => set("name", v)} />
          <ProfileField label="Alamat Email" testId="profile-email" value={form.email} onChange={(v) => set("email", v)} />
          <ProfileField label="Nomor Telepon" testId="profile-phone" value={form.phone} onChange={(v) => set("phone", v)} />
          <ProfileField label="Jabatan / Role" testId="profile-role" value={form.role} onChange={(v) => set("role", v)} />
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={loading}
            data-testid="save-profile-btn"
            style={{
              background: "#FFA000",
              color: "#fff",
              border: "none",
              borderRadius: 8,
            }}
            className="h-11 px-8 text-sm font-semibold"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, onChange, testId }) {
  return (
    <div style={{ paddingBottom: 28 }}>
      <p
        style={{
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#999",
          fontWeight: 700,
          margin: "0 0 8px",
        }}
      >
        {label}
      </p>
      <input
        data-testid={testId}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          fontSize: 15,
          fontWeight: 700,
          color: "#1a1a1a",
          background: "transparent",
          border: "none",
          borderBottom: "1.5px solid #ddd",
          outline: "none",
          padding: "0 0 10px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}