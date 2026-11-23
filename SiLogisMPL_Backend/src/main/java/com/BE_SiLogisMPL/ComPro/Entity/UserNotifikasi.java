package com.BE_SiLogisMPL.ComPro.Entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@ToString
@Entity
@Table(name = "usernotifikasi")
public class UserNotifikasi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean sudahDibaca;

    // Status pengiriman SAAT notifikasi dibuat (supaya riwayat notifikasi tidak ikut berubah)
    private String statusSaatItu;

    // Waktu notifikasi dibuat (WIB)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private User user;

    // Tanpa cascade: menghapus notifikasi tidak boleh ikut menghapus pesanan
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", nullable = true)
    @ToString.Exclude
    private Order order;
}
