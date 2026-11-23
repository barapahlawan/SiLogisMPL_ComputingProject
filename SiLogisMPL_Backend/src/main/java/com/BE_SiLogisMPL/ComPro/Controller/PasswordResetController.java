package com.BE_SiLogisMPL.ComPro.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BE_SiLogisMPL.ComPro.DTO.WebResponse;
import com.BE_SiLogisMPL.ComPro.Entity.User;
import com.BE_SiLogisMPL.ComPro.Repository.UserRepository;
import com.BE_SiLogisMPL.ComPro.Service.EmailService;
import com.BE_SiLogisMPL.ComPro.Service.OtpService;

// Alur lupa password: 1) kirim OTP ke email  2) cek OTP  3) simpan password baru (wajib OTP benar)
// Semua error dilempar sebagai RuntimeException -> dijawab HTTP 400 oleh GlobalExceptionHandler.
@RestController
@RequestMapping("auth")
public class PasswordResetController {

    // Aturan password sama dengan DTO Register
    private static final String POLA_PASSWORD =
            "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.*_-]).{8,}$";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String ambilEmail(Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.isBlank()) {
            throw new RuntimeException("Email wajib diisi");
        }
        return email.trim();
    }

    private WebResponse<String> sukses(String pesan) {
        return WebResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .status(HttpStatus.OK.getReasonPhrase())
                .data(pesan)
                .build();
    }

    // Step 1: Kirim OTP ke email
    @PostMapping("/forgot-password")
    public WebResponse<String> forgotPassword(@RequestBody Map<String, String> body) {
        String email = ambilEmail(body);
        userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email tidak terdaftar di sistem kami"));

        String otp = otpService.generateOtp(email);
        try {
            emailService.sendOtpEmail(email, otp);
        } catch (RuntimeException e) {
            otpService.hapusOtp(email); // supaya user bisa langsung coba kirim lagi
            throw e;
        }
        return sukses("Kode OTP telah dikirim ke " + email);
    }

    // Step 2: Cek OTP (belum dihapus, karena masih dipakai lagi di step 3)
    @PostMapping("/verify-otp")
    public WebResponse<String> verifyOtp(@RequestBody Map<String, String> body) {
        String email = ambilEmail(body);
        otpService.validateOtp(email, body.get("otp"), false);
        return sukses("OTP valid");
    }

    // Step 3: Simpan password baru. OTP WAJIB dikirim lagi dan dicek, supaya tidak ada yang bisa
    // mengganti password orang lain hanya dengan mengetahui email-nya.
    @PostMapping("/reset-password")
    public WebResponse<String> resetPassword(@RequestBody Map<String, String> body) {
        String email = ambilEmail(body);
        String newPassword = body.get("newPassword");

        if (newPassword == null || !newPassword.matches(POLA_PASSWORD)) {
            throw new RuntimeException("Password minimal 8 karakter, serta harus mengandung angka, huruf besar, huruf kecil, dan karakter spesial");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email tidak ditemukan"));

        otpService.validateOtp(email, body.get("otp"), true);

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return sukses("Kata sandi berhasil diubah. Silakan masuk kembali.");
    }
}
