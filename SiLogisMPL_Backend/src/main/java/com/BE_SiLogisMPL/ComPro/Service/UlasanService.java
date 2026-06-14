package com.BE_SiLogisMPL.ComPro.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BE_SiLogisMPL.ComPro.DTO.UlasanDTO;
import com.BE_SiLogisMPL.ComPro.Entity.Order;
import com.BE_SiLogisMPL.ComPro.Entity.Ulasan;
import com.BE_SiLogisMPL.ComPro.Entity.User;
import com.BE_SiLogisMPL.ComPro.Repository.OrderRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UlasanRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UserRepository;

@Service
public class UlasanService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UlasanRepository ulasanRepository;

    public String createUlasan(String username, Long orderId, UlasanDTO ulasanDTO) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order tidak ditemukan"));

        Ulasan ulasan = Ulasan.builder()
                .komentar(ulasanDTO.getKomentar())
                .rating(ulasanDTO.getRating())
                .user(user)
                .order(order)
                .build();

        ulasanRepository.save(ulasan);

        return "Ulasan terbuat";
    }

    public List<Ulasan> viewUlasan() {
        return ulasanRepository.findAll();
    }

    public String deleteUlasan(Long ulasanId) {
        Ulasan ulasan = ulasanRepository.findById(ulasanId)
                .orElseThrow(() -> new RuntimeException("Ulasan tidak ditemukan"));
        ulasanRepository.delete(ulasan);
        return "Ulasan dihapus";
    }

    public String replyUlasan(Long ulasanId, UlasanDTO ulasanDTO) {
        Ulasan ulasan = ulasanRepository.findById(ulasanId)
                .orElseThrow(() -> new RuntimeException("Ulasan tidak ditemukan"));
        ulasan.setBalasan(ulasanDTO.getBalasan());
        ulasanRepository.save(ulasan);
        return "Balasan ditambahkan";
    }
}
