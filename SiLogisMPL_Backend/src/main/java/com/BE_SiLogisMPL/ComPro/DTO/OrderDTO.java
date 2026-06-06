package com.BE_SiLogisMPL.ComPro.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class OrderDTO {
    @NotBlank(message = "Jenis Paket harus diisi")
    private String jenisPaket;
    @NotNull(message = "Total Berat harus diisi")
    private Double totalBerat;
    @NotNull(message = "Total Paket harus diisi")
    private int totalPaket;
    @NotBlank(message = "Nama Pengirim harus diisi")
    private String namaPengirim;
    @NotBlank(message = "Alamat Asal harus diisi")
    private String alamatAsal;
    @NotBlank(message = "PIC Pengirim harus diisi")
    private String picPengirim;
    @NotBlank(message = "Nomor Telepon Pengirim harus diisi")
    private String nomorTeleponPengirim;
    @NotBlank(message = "Nama Penerima harus diisi")
    private String namaPenerima;
    @NotBlank(message = "Alamat Tujuan harus diisi")
    private String alamatTujuan;
    @NotBlank(message = "PIC Penerima  harus diisi")
    private String picPenerima;
    @NotBlank(message = "Nomor Telepon Penerima harus diisi")
    private String nomorTeleponPenerima;
    @NotBlank(message = "Jenis Kendaraan harus diisi")
    private String jenisKendaraan;
    @NotBlank(message = "Tipe harus diisi")
    private String tipe;
    @NotNull(message = "Kapasitas harus diisi")
    private int kapasitas;
    private String catatanTambahan;
}
