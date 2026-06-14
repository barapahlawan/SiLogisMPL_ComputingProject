package com.BE_SiLogisMPL.ComPro.Entity;

import java.util.List;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "companyprofile")
public class CompanyProfile {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String headlineBaris1;
        private String headlineBaris2;
        private String headlineBaris3;
        private String tagline;
        private String teksTombolCTA;
        private String angkaStatistik1;
        private String angkaStatistik2;
        private String labelStatistik1;
        private String labelStatistik2;
        private String teksBadge;
        private String urlGambarOtomatis;
        private String urlGambarManual;
        private String altText;
        private String judulSeksiSiapaKami;
        private String paragrafUtama;
        private String paragrafLanjutan;
        @JdbcTypeCode(SqlTypes.JSON)
        @Column(name = "info_kilat", columnDefinition = "text")
        private List<Map<String, Object>> infoKilat;
        private int noVisi;
        private String judulVisi;
        private List<String> poinVisi;
        private int noMisi;
        private String judulMisi;
        private List<String> poinMisi;
        private String judulSeksiNilai;
        @JdbcTypeCode(SqlTypes.JSON)
        @Column(name = "nilai", columnDefinition = "text")
        private List<Map<String, Object>> nilai;
        private String judulSeksiLayanan;
        private String subJudulSeksiLayanan;
        private String deskripsiSampingKanan;
        @JdbcTypeCode(SqlTypes.JSON)
        @Column(name = "layanan", columnDefinition = "text")
        private List<Map<String, Object>> layanan;
        private String judulSeksiKendaraan;
        private String deskripsiPengantar;
        private String teksTombolLihatSemua;
        @JdbcTypeCode(SqlTypes.JSON)
        @Column(name = "kendaraan", columnDefinition = "text")
        private List<Map<String, Object>> kendaraan;
}