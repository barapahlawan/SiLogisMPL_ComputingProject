package com.BE_SiLogisMPL.ComPro.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.BE_SiLogisMPL.ComPro.DTO.OrderDTO;
import com.BE_SiLogisMPL.ComPro.DTO.PengirimDTO;
import com.BE_SiLogisMPL.ComPro.Entity.Order;
import com.BE_SiLogisMPL.ComPro.Entity.User;
import com.BE_SiLogisMPL.ComPro.Entity.UserNotifikasi;
import com.BE_SiLogisMPL.ComPro.Repository.OrderRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UserNotifikasiRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserNotifikasiRepository userNotifikasiRepository;

    private static final ZoneId WIB = ZoneId.of("Asia/Jakarta");

    private static final Set<String> STATUS_PENGIRIMAN_VALID =
            Set.of("Diproses", "Barang-Diambil", "Dalam-Perjalanan", "Tiba-di-Tujuan");

    public String generateOrderNumber() {
        LocalDateTime timeNow = LocalDateTime.now(WIB);
        String datePart = timeNow.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String timePart = timeNow.format(DateTimeFormatter.ofPattern("HHmmss"));
        int acak = ThreadLocalRandom.current().nextInt(100, 1000);
        return String.format("MPL-%s-%s-%d", datePart, timePart, acak);
    }

    private void buatNotifikasi(Order order) {
        if (order.getUser() == null) {
            return;
        }
        UserNotifikasi userNotifikasi = new UserNotifikasi();
        userNotifikasi.setSudahDibaca(false);
        userNotifikasi.setOrder(order);
        userNotifikasi.setUser(order.getUser());
        userNotifikasi.setStatusSaatItu("DONE".equals(order.getStatus()) ? "DONE" : order.getStatusPengiriman());
        userNotifikasi.setCreatedAt(LocalDateTime.now(WIB));
        userNotifikasiRepository.save(userNotifikasi);
    }

    public String createOrder(OrderDTO orderDTO, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));

        Order order = Order.builder()
                .alamatAsal(orderDTO.getAlamatAsal())
                .alamatTujuan(orderDTO.getAlamatTujuan())
                .catatanTambahan(orderDTO.getCatatanTambahan())
                .jenisKendaraan(orderDTO.getJenisKendaraan())
                .jenisPaket(orderDTO.getJenisPaket())
                .kapasitas(orderDTO.getKapasitas())
                .namaPenerima(orderDTO.getNamaPenerima())
                .namaPengirim(orderDTO.getNamaPengirim())
                .nomorTeleponPenerima(orderDTO.getNomorTeleponPenerima())
                .nomorTeleponPengirim(orderDTO.getNomorTeleponPengirim())
                .orderNumber(generateOrderNumber())
                .picPenerima(orderDTO.getPicPenerima())
                .picPengirim(orderDTO.getPicPengirim())
                .tipe(orderDTO.getTipe())
                .totalBerat(orderDTO.getTotalBerat())
                .totalPaket(orderDTO.getTotalPaket())
                .status("PENDING")
                .user(user)
                .build();
        orderRepository.save(order);
        return "Pesanan berhasil dibuat";
    }

    public List<Order> viewOrder(String username, String status) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        return orderRepository.findByUserAndStatus(user, status);
    }

    public List<Order> viewAllOrder(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        return orderRepository.findByUser(user);
    }

    public Order detailPesanan(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        return order;
    }

    public String verifikasiPesanan(Long id, String status, PengirimDTO pengirimDTO) {
        if (!"ONGOING".equals(status)) {
            throw new RuntimeException("Status verifikasi tidak valid");
        }
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));

        if (!"PENDING".equals(order.getStatus())) {
            throw new RuntimeException("Pesanan tidak meminta verifikasi");
        }
        if (pengirimDTO == null || pengirimDTO.getNamaDriver() == null || pengirimDTO.getNamaDriver().isBlank()
                || pengirimDTO.getPlatNomor() == null || pengirimDTO.getPlatNomor().isBlank()) {
            throw new RuntimeException("Nama driver dan plat nomor wajib diisi");
        }

        order.setNamaDriver(pengirimDTO.getNamaDriver());
        order.setPlatNomor(pengirimDTO.getPlatNomor());
        order.setStatus(status);
        order.setStatusPengiriman("Diproses");
        orderRepository.save(order);

        buatNotifikasi(order);

        return "Pesanan sudah diverifikasi";
    }

    public String updateStatusPengiriman(Long id, String statusPengiriman) {
        if (!STATUS_PENGIRIMAN_VALID.contains(statusPengiriman)) {
            throw new RuntimeException("Status pengiriman tidak valid: " + statusPengiriman);
        }
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        if (!"ONGOING".equals(order.getStatus())) {
            throw new RuntimeException("Pesanan tidak sedang diproses");
        }

        order.setStatusPengiriman(statusPengiriman);
        if ("Tiba-di-Tujuan".equals(statusPengiriman) && order.getUrlInvoice() != null) {
            order.setStatus("DONE");
        }
        orderRepository.save(order);

        buatNotifikasi(order);

        return "Pesanan sudah terupdate";
    }

    public List<Order> viewPesanan() {
        return orderRepository.findAll();
    }

    public String uploadInvoice(MultipartFile invoice, Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        if (invoice == null || invoice.isEmpty()) {
            throw new RuntimeException("File invoice wajib diunggah");
        }
        try {
            String urlImage = fileStorageService.uploadFile(invoice);
            order.setUrlInvoice(urlImage);
            boolean jadiSelesai = "ONGOING".equals(order.getStatus())
                    && "Tiba-di-Tujuan".equals(order.getStatusPengiriman());
            if (jadiSelesai) {
                order.setStatus("DONE");
            }
            orderRepository.save(order);
            if (jadiSelesai) {
                buatNotifikasi(order);
            }
            return urlImage;
        } catch (IOException e) {
            throw new RuntimeException("Gagal mengunggah invoice: " + e.getMessage());
        }
    }
}
