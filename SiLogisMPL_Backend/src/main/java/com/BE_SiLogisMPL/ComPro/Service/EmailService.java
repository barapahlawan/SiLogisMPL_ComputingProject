package com.BE_SiLogisMPL.ComPro.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

// Kirim email lewat EmailJS (HTTPS). SMTP Gmail (port 587/465) tidak bisa dipakai dari Hugging Face Spaces.
// Semua kunci diambil dari Secrets Hugging Face, tidak ditulis di kode.
@Service
public class EmailService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${emailjs.service-id}")
    private String serviceId;

    @Value("${emailjs.template-id}")
    private String templateId;

    @Value("${emailjs.public-key}")
    private String publicKey;

    @Value("${emailjs.private-key}")
    private String privateKey;

    public void sendOtpEmail(String toEmail, String otp) {
        if (serviceId.isBlank() || templateId.isBlank() || publicKey.isBlank() || privateKey.isBlank()) {
            throw new RuntimeException("Layanan email belum dikonfigurasi. Hubungi admin.");
        }

        Map<String, Object> templateParams = new HashMap<>();
        templateParams.put("to_email", toEmail);
        templateParams.put("otp", otp);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("service_id", serviceId);
        requestBody.put("template_id", templateId);
        requestBody.put("user_id", publicKey);
        requestBody.put("accessToken", privateKey);
        requestBody.put("template_params", templateParams);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        try {
            restTemplate.postForEntity("https://api.emailjs.com/api/v1.0/email/send",
                    new HttpEntity<>(requestBody, headers), String.class);
        } catch (Exception e) {
            System.err.println("Gagal mengirim email OTP lewat EmailJS: " + e.getMessage());
            throw new RuntimeException("Gagal mengirim email OTP. Silakan coba lagi nanti.");
        }
    }
}
