package com.BE_SiLogisMPL.ComPro.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

// Menambah kolom baru yang dibutuhkan kode, karena di database ini Hibernate (ddl-auto=update)
// tidak selalu menambahkan kolom sendiri. Aman dijalankan berulang kali (IF NOT EXISTS).
@Component
public class MigrationRunner implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        jalankan("ALTER TABLE orders ADD COLUMN IF NOT EXISTS plat_nomor_kendaraan VARCHAR(255)");
        jalankan("ALTER TABLE usernotifikasi ADD COLUMN IF NOT EXISTS status_saat_itu VARCHAR(255)");
        jalankan("ALTER TABLE usernotifikasi ADD COLUMN IF NOT EXISTS created_at TIMESTAMP(6)");
    }

    private void jalankan(String sql) {
        try {
            jdbcTemplate.execute(sql);
            System.out.println("Migrasi OK: " + sql);
        } catch (Exception e) {
            System.err.println("Migrasi gagal: " + sql + " -> " + e.getMessage());
        }
    }
}
