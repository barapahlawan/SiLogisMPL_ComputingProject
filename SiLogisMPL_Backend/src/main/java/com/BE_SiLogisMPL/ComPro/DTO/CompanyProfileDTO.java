package com.BE_SiLogisMPL.ComPro.DTO;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CompanyProfileDTO {
    @NotEmpty(message = "Username tidak boleh kosong")
    private String username;

    @NotEmpty(message = "Email tidak boleh kosong")
    private String email;

    @NotEmpty(message = "Nomor telepon tidak boleh kosong")
    private String noTelepon;

    @NotEmpty(message = "Headline baris 1 tidak boleh kosong")
    private String headlineBaris1;

    @NotEmpty(message = "Headline baris 2 tidak boleh kosong")
    private String headlineBaris2;

    @NotEmpty(message = "Headline baris 3 tidak boleh kosong")
    private String headlineBaris3;

    @NotEmpty(message = "Tagline tidak boleh kosong")
    private String tagline;

    @NotEmpty(message = "Teks tombol CTA tidak boleh kosong")
    private String teksTombolCTA;

    @NotEmpty(message = "Angka statistik 1 tidak boleh kosong")
    private String angkaStatistik1;

    @NotEmpty(message = "Angka statistik 2 tidak boleh kosong")
    private String angkaStatistik2;

    @NotEmpty(message = "Label statistik 1 tidak boleh kosong")
    private String labelStatistik1;

    @NotEmpty(message = "Label statistik 2 tidak boleh kosong")
    private String labelStatistik2;

    @NotEmpty(message = "Teks badge tidak boleh kosong")
    private String teksBadge;

    private String urlGambarOtomatis;

    private MultipartFile fileGambarOtomatis;

    private String urlGambarManual;

    @NotEmpty(message = "Alt text tidak boleh kosong")
    private String altText;

    @NotEmpty(message = "Judul seksi siapa kami tidak boleh kosong")
    private String judulSeksiSiapaKami;

    @NotEmpty(message = "Paragraf utama tidak boleh kosong")
    private String paragrafUtama;

    @NotEmpty(message = "Paragraf lanjutan tidak boleh kosong")
    private String paragrafLanjutan;

    @NotEmpty(message = "Judul visi tidak boleh kosong")
    private String judulVisi;

    @NotEmpty(message = "Judul misi tidak boleh kosong")
    private String judulMisi;

    @NotEmpty(message = "Judul seksi nilai tidak boleh kosong")
    private String judulSeksiNilai;

    @NotEmpty(message = "Judul seksi layanan tidak boleh kosong")
    private String judulSeksiLayanan;

    @NotEmpty(message = "Sub judul seksi layanan tidak boleh kosong")
    private String subJudulSeksiLayanan;

    @NotEmpty(message = "Deskripsi samping kanan tidak boleh kosong")
    private String deskripsiSampingKanan;

    @NotEmpty(message = "Judul seksi kendaraan tidak boleh kosong")
    private String judulSeksiKendaraan;

    @NotEmpty(message = "Deskripsi pengantar tidak boleh kosong")
    private String deskripsiPengantar;

    @NotEmpty(message = "Teks tombol lihat semua tidak boleh kosong")
    private String teksTombolLihatSemua;

    @NotEmpty(message = "Info kilat tidak boleh kosong")
    private List<Map<String, Object>> infoKilat;

    @NotEmpty(message = "Poin visi tidak boleh kosong")
    private List<String> poinVisi;

    @NotEmpty(message = "Poin misi tidak boleh kosong")
    private List<String> poinMisi;

    @NotEmpty(message = "Nilai tidak boleh kosong")
    private List<Map<String, Object>> nilai;

    @NotEmpty(message = "Layanan tidak boleh kosong")
    private List<Map<String, Object>> layanan;

    @NotEmpty(message = "Kendaraan tidak boleh kosong")
    private List<Map<String, Object>> kendaraan;

    @Positive(message = "Nomor visi harus berupa angka positif lebih dari 0")
    private int noVisi;

    @Positive(message = "Nomor misi harus berupa angka positif lebih dari 0")
    private int noMisi;
}
