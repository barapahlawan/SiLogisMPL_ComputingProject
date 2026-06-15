package com.BE_SiLogisMPL.ComPro.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.BE_SiLogisMPL.ComPro.DTO.OrderDTO;
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

    public String generateOrderNumber() {
        LocalDateTime timeNow = LocalDateTime.now();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String datePart = timeNow.format(dateFormatter);
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmm");
        String timePart = timeNow.format(timeFormatter);
        String orderNumber = String.format("MPL-%s-%s", datePart, timePart);
        return orderNumber;
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
        List<Order> order = orderRepository.findByUserAndStatus(user, status);
        if (order.isEmpty()) {
            throw new RuntimeException("Pesanan yang sedang dilakukan tidak ditemukan");
        }
        return order;
    }

    public List<Order> viewAllOrder(String username) {
        // 1. Cari user berdasarkan email/username
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));

        // 2. Ambil semua data pesanan dalam bentuk List
        List<Order> orders = orderRepository.findByUser(user);

        // 3. Langsung return list-nya (bisa berisi data, atau kosong [] jika belum
        // pernah order)
        return orders;
    }

    public Order detailPesanan(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        return order;
    }

    public String verifikasiPesanan(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        if (!order.getStatus().equals("PENDING")) {
            throw new RuntimeException("Pesanan tidak meminta verifikasi");
        }
        Order newOrder = order.toBuilder()
                .id(null)
                .ulasan(null)
                .build();
        order.setStatus(status);
        order.setStatusPengiriman("Diproses");
        orderRepository.save(order);
        User user = order.getUser();
        UserNotifikasi userNotifikasi = UserNotifikasi.builder()
                .id(null)
                .sudahDibaca(false)
                .order(newOrder)
                .user(user)
                .build();
        userNotifikasiRepository.save(userNotifikasi);
        return "Pesanan sudah diverifikasi";
    }

    public String updateStatusPengiriman(Long id, String statusPengiriman) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        if (statusPengiriman.equals("Tiba-di-Tujuan") && order.getUrlInvoice() != null) {
            order.setStatus("DONE");
        } else if (!order.getStatus().equals("ONGOING")) {
            throw new RuntimeException("Pesanan tidak sedang diproses");
        }
        order.setStatusPengiriman(statusPengiriman);
        orderRepository.save(order); // Simpan perubahan status order utama

        // 3. AMBIL USER PEMILIK ORDER
        User user = order.getUser();

        // 4. BUAT NOTIFIKASI BARU (LANGSUNG IKAT KE ORDER ASLI)
        UserNotifikasi userNotifikasi = new UserNotifikasi();
        userNotifikasi.setId(null); // Set null agar digenerate otomatis oleh database
        userNotifikasi.setSudahDibaca(false);

        // 🌟 KUNCINYA: Jangan di-clone! Masukkan objek order asli hasil update tadi
        userNotifikasi.setOrder(order);
        userNotifikasi.setUser(user);

        // Simpan Notifikasi (Hanya akan menambah 1 baris di tabel usernotifikasi)
        userNotifikasiRepository.save(userNotifikasi);

        return "Pesanan sudah terupdate";
    }

    public List<Order> viewPesanan() {
        if (orderRepository.findAll().isEmpty()) {
            throw new RuntimeException("Tidak ada pesanan");
        }

        return orderRepository.findAll();
    }

    public String uploadInvoice(MultipartFile invoice, Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        try {
            String urlImage = fileStorageService.uploadFile(invoice);
            order.setUrlInvoice(urlImage);
            orderRepository.save(order);
            if (order.getStatusPengiriman().equals("Tiba-di-Tujuan")) {
                order.setStatus("DONE");
                orderRepository.save(order);
            }
            return urlImage;
        } catch (IOException e) {
            return e.getMessage();
        }
    }
}
