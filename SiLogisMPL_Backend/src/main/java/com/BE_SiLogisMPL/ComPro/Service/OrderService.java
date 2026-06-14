package com.BE_SiLogisMPL.ComPro.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

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
        orderRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        List<Order> order = orderRepository.findByUserAndStatus(user, status);
        if (order.isEmpty()) {
            throw new RuntimeException("Pesanan yang sedang dilakukan tidak ditemukan");
        }
        return order;
    }

    public Optional<Order> viewAllOrder(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        orderRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        Optional<Order> order = orderRepository.findByUser(user);
        if (order.isEmpty()) {
            throw new RuntimeException("Pesanan yang sedang dilakukan tidak ditemukan");
        }
        return order;
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
        order.setStatus(status);
        order.setStatusPengiriman("Diproses");
        orderRepository.save(order);
        User user = order.getUser();
        UserNotifikasi userNotifikasi = user.getUserNotifikasi();
        userNotifikasi.setOrder(order);
        userNotifikasiRepository.save(userNotifikasi);
        return "Pesanan sudah diverifikasi";
    }

    public String updateStatusPengiriman(Long id, String statusPengiriman) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        if (!order.getStatus().equals("ONGOING")) {
            throw new RuntimeException("Pesanan tidak sedang diproses");
        }
        order.setStatusPengiriman(statusPengiriman);
        orderRepository.save(order);
        User user = order.getUser();
        UserNotifikasi userNotifikasi = user.getUserNotifikasi();
        userNotifikasi.setOrder(order);
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
            return urlImage;
        } catch (IOException e) {
            return e.getMessage();
        }
    }
}
