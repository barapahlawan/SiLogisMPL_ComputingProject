package com.BE_SiLogisMPL.ComPro.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderNumber;
    private String jenisPaket;
    private Double totalBerat;
    private int totalPaket;
    private String namaPengirim;
    private String alamatAsal;
    private String picPengirim;
    private String nomorTeleponPengirim;
    private String namaPenerima;
    private String alamatTujuan;
    private String picPenerima;
    private String nomorTeleponPenerima;
    private String jenisKendaraan;
    private String tipe;
    private int kapasitas;
    private String catatanTambahan;
    private String status;
    private String urlInvoice;
    private String statusPengiriman;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    @JsonIgnore
    private User user;
    @OneToOne(mappedBy = "order")
    private Ulasan ulasan;
}