package com.BE_SiLogisMPL.ComPro.Service;

import java.security.SecureRandom;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class OtpService {

    private static final long OTP_EXPIRY_MS = 5 * 60 * 1000;   // OTP berlaku 5 menit
    private static final long RESEND_COOLDOWN_MS = 60 * 1000;  // kirim ulang minimal 60 detik sekali
    private static final int MAX_PERCOBAAN = 5;                // salah 5x -> OTP hangus

    private static final SecureRandom RANDOM = new SecureRandom();

    // Data OTP sementara di memori (hilang kalau server restart; user cukup minta kode baru)
    private static class DataOtp {
        final String kode;
        final long kedaluwarsa;
        final long dibuatPada;
        int percobaanSalah = 0;

        DataOtp(String kode, long kedaluwarsa, long dibuatPada) {
            this.kode = kode;
            this.kedaluwarsa = kedaluwarsa;
            this.dibuatPada = dibuatPada;
        }
    }

    private final Map<String, DataOtp> otpStore = new ConcurrentHashMap<>();

    private String kunci(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }

    public String generateOtp(String email) {
        long sekarang = System.currentTimeMillis();
        DataOtp lama = otpStore.get(kunci(email));
        if (lama != null && sekarang - lama.dibuatPada < RESEND_COOLDOWN_MS) {
            long sisaDetik = (RESEND_COOLDOWN_MS - (sekarang - lama.dibuatPada)) / 1000 + 1;
            throw new RuntimeException("Tunggu " + sisaDetik + " detik sebelum meminta kode baru");
        }
        // 4 digit, sesuai 4 kotak input di halaman Lupa Password
        String kode = String.format("%04d", RANDOM.nextInt(10000));
        otpStore.put(kunci(email), new DataOtp(kode, sekarang + OTP_EXPIRY_MS, sekarang));
        return kode;
    }

    // Cek OTP. consume=true -> OTP langsung dihapus setelah benar (dipakai saat reset password)
    public void validateOtp(String email, String otp, boolean consume) {
        DataOtp data = otpStore.get(kunci(email));
        if (data == null) {
            throw new RuntimeException("Kode OTP tidak valid atau sudah kedaluwarsa. Silakan minta kode baru.");
        }
        if (System.currentTimeMillis() > data.kedaluwarsa) {
            otpStore.remove(kunci(email));
            throw new RuntimeException("Kode OTP sudah kedaluwarsa. Silakan minta kode baru.");
        }
        if (otp == null || !data.kode.equals(otp.trim())) {
            data.percobaanSalah++;
            if (data.percobaanSalah >= MAX_PERCOBAAN) {
                otpStore.remove(kunci(email));
                throw new RuntimeException("Terlalu banyak percobaan salah. Silakan minta kode baru.");
            }
            throw new RuntimeException("Kode OTP salah. Sisa percobaan: " + (MAX_PERCOBAAN - data.percobaanSalah));
        }
        if (consume) {
            otpStore.remove(kunci(email));
        }
    }

    // Hapus OTP lama kalau pengiriman email gagal, supaya user bisa langsung coba lagi
    public void hapusOtp(String email) {
        otpStore.remove(kunci(email));
    }
}
