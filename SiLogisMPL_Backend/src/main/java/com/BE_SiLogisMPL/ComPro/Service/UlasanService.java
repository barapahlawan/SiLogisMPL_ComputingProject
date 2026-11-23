package com.BE_SiLogisMPL.ComPro.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BE_SiLogisMPL.ComPro.DTO.UlasanDTO;
import com.BE_SiLogisMPL.ComPro.Entity.Order;
import com.BE_SiLogisMPL.ComPro.Entity.Ulasan;
import com.BE_SiLogisMPL.ComPro.Entity.User;
import com.BE_SiLogisMPL.ComPro.Repository.OrderRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UlasanRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UserRepository;
import com.BE_SiLogisMPL.ComPro.Entity.UserProfile;

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

        if (order.getUser() == null || !order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Pesanan ini bukan milik Anda");
        }
        if (!"DONE".equals(order.getStatus())) {
            throw new RuntimeException("Ulasan hanya bisa diberikan setelah pesanan selesai");
        }
        if (order.getUlasan() != null) {
            throw new RuntimeException("Pesanan ini sudah diulas");
        }
        if (ulasanDTO.getRating() == null || ulasanDTO.getRating() < 1 || ulasanDTO.getRating() > 5) {
            throw new RuntimeException("Rating harus antara 1 sampai 5");
        }

        LocalDateTime waktu = LocalDateTime.now(ZoneId.of("Asia/Jakarta"));
        Ulasan ulasan = Ulasan.builder()
                .komentar(ulasanDTO.getKomentar())
                .rating(ulasanDTO.getRating())
                .createdAt(waktu)
                .user(user)
                .order(order)
                .build();
        ulasanRepository.save(ulasan);
        return "Ulasan terbuat";
    }

    public List<Ulasan> viewUlasan() {
        return ulasanRepository.findAll();
    }

    public List<Map<String, Object>> viewUlasanPublic() {
        return ulasanRepository.findAll().stream().map(u -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", u.getId());
            m.put("rating", u.getRating());
            m.put("komentar", u.getKomentar());
            m.put("balasan", u.getBalasan());
            m.put("createdAt", u.getCreatedAt());

            Map<String, Object> user = new LinkedHashMap<>();
            Map<String, Object> profile = new LinkedHashMap<>();
            if (u.getUser() != null) {
                user.put("username", u.getUser().getUsername());
                UserProfile p = u.getUser().getUserProfile();
                if (p != null) {
                    profile.put("jabatan", p.getJabatan());
                    profile.put("perusahaan", p.getPerusahaan());
                    profile.put("urlProfilePicture", p.getUrlProfilePicture());
                }
            }
            user.put("userProfile", profile);
            m.put("user", user);
            return m;
        }).toList();
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
        ZoneId zonaIndo = ZoneId.of("Asia/Jakarta");
        LocalDateTime waktu = LocalDateTime.now(zonaIndo);
        ulasan.setBalasan(ulasanDTO.getBalasan());
        ulasan.setRepliedAt(waktu);
        ulasanRepository.save(ulasan);
        return "Balasan ditambahkan";
    }
}
