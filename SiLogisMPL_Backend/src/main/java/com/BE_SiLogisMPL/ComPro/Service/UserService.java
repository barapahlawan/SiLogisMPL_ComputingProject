package com.BE_SiLogisMPL.ComPro.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.BE_SiLogisMPL.ComPro.DTO.AdminDashboard;
import com.BE_SiLogisMPL.ComPro.DTO.AdminProfileDTO;
import com.BE_SiLogisMPL.ComPro.DTO.CompanyProfileDTO;
import com.BE_SiLogisMPL.ComPro.DTO.UserProfileDTO;
import com.BE_SiLogisMPL.ComPro.Entity.AdminProfile;
import com.BE_SiLogisMPL.ComPro.Entity.CompanyProfile;
import com.BE_SiLogisMPL.ComPro.Entity.User;
import com.BE_SiLogisMPL.ComPro.Entity.UserNotifikasi;
import com.BE_SiLogisMPL.ComPro.Entity.UserProfile;
import com.BE_SiLogisMPL.ComPro.Repository.AdminProfileRepository;
import com.BE_SiLogisMPL.ComPro.Repository.CompanyProfileRepository;
import com.BE_SiLogisMPL.ComPro.Repository.OrderRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UserNotifikasiRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UserProfileRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private AdminProfileRepository adminProfileRepository;

    @Autowired
    private CompanyProfileRepository companyProfileRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserNotifikasiRepository userNotifikasiRepository;

    public AdminDashboard viewDashboard() {
        if (orderRepository.findAll().isEmpty()) {
            throw new RuntimeException("Tidak ada pesanan");
        }

        return AdminDashboard.builder()
                .pesananTertunda(orderRepository.findByStatus("PENDING").size())
                .pengirimanBerjalan(orderRepository.findByStatus("ONGOING").size())
                .pesanan(orderRepository.findAll())
                .build();
    }

    public String editProfile(UserProfileDTO userProfileDTO, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));

        if (user.getUsername().equals(userProfileDTO.getUsername())) {
            // Jika username yang diupdate sama dengan username saat ini, maka tidak perlu
            // cek duplikasi
        } else if (userRepository.existsByUsername(userProfileDTO.getUsername())) {
            throw new RuntimeException("Username sudah dipakai");
        }

        if (user.getEmail().equals(userProfileDTO.getEmail())) {
            // Jika email yang diupdate sama dengan email saat ini, maka tidak perlu cek
            // duplikasi
        } else if (userRepository.existsByEmail(userProfileDTO.getEmail())) {
            throw new RuntimeException("Email sudah dipakai");
        }
        UserProfile userProfile;
        if (user.getUserProfile() == null) {
            userProfile = new UserProfile();
            userProfile.setUser(user);
        } else {
            userProfile = user.getUserProfile();
        }

        userProfile.setAlamat(userProfileDTO.getAlamat());
        userProfile.setNoTelepon(userProfileDTO.getNoTelepon());
        userProfile.setIndustri(userProfileDTO.getIndustri());
        userProfile.setJabatan(userProfileDTO.getJabatan());
        userProfile.setPerusahaan(userProfileDTO.getPerusahaan());
        userProfile.setNpwpPerusahaan(userProfileDTO.getNpwpPerusahaan());

        userProfileRepository.save(userProfile);

        user.setUsername(userProfileDTO.getUsername());
        user.setEmail(userProfileDTO.getEmail());

        userRepository.save(user);

        return "Profil sudah diperbarui";
    }

    public String editAlamat(UserProfileDTO userProfileDTO, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));

        if (userRepository.existsByUsername(userProfileDTO.getUsername())) {
            throw new RuntimeException("Username sudah dipakai");
        }

        if (userRepository.existsByEmail(userProfileDTO.getEmail())) {
            throw new RuntimeException("Email sudah dipakai");
        }

        UserProfile userProfileUpdate = user.getUserProfile().toBuilder()
                .Alamat(userProfileDTO.getAlamat())
                .build();

        userProfileRepository.save(userProfileUpdate);

        return "Profil sudah diperbarui";
    }

    public User viewProfile(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        return user;
    }

    public String editProfileAdmin(AdminProfileDTO adminProfileDTO, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));

        if (user.getUsername().equals(adminProfileDTO.getUsername())) {
            // Jika username yang diupdate sama dengan username saat ini, maka tidak perlu
            // cek duplikasi
        } else if (userRepository.existsByUsername(adminProfileDTO.getUsername())) {
            throw new RuntimeException("Username sudah dipakai");
        }

        if (user.getEmail().equals(adminProfileDTO.getEmail())) {
            // Jika email yang diupdate sama dengan email saat ini, maka tidak perlu cek
            // duplikasi
        } else if (userRepository.existsByEmail(adminProfileDTO.getEmail())) {
            throw new RuntimeException("Email sudah dipakai");
        }

        AdminProfile adminProfileUpdate = user.getAdminProfile().toBuilder()
                .noTelepon(adminProfileDTO.getNoTelepon())
                .build();

        adminProfileRepository.save(adminProfileUpdate);

        User userUpdate = user.toBuilder()
                .username(adminProfileDTO.getUsername())
                .email(adminProfileDTO.getEmail())
                .build();

        userRepository.save(userUpdate);
        return "Profil sudah diperbarui";
    }

    public User viewProfileAdmin(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        return user;
    }

    public String editCompanyProfile(MultipartFile file, CompanyProfileDTO companyProfileDTO, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        CompanyProfile companyProfile = user.getCompanyProfile();
        if (file != null && !file.isEmpty()) {
            try {
                String urlImage = fileStorageService.uploadFile(file);
                System.out.println(urlImage);
                companyProfile.setUrlGambar(urlImage); // Langsung set ke entity companyProfile
                System.out.println("outsave");
            } catch (IOException e) {
                System.out.println("outgagal");
                return e.getMessage();
            }
        } else {
            // Jika frontend tidak mengirim file baru, pertahankan URL gambar yang lama
            System.out.println("Tidak ada file baru yang diunggah, mempertahankan gambar lama.");
        }

        System.out.println("out");

        companyProfile.setHeadlineBaris1(companyProfileDTO.getHeadlineBaris1());
        companyProfile.setHeadlineBaris2(companyProfileDTO.getHeadlineBaris2());
        companyProfile.setHeadlineBaris3(companyProfileDTO.getHeadlineBaris3());
        companyProfile.setTagline(companyProfileDTO.getTagline());
        companyProfile.setTeksTombolCTA(companyProfileDTO.getTeksTombolCTA());
        companyProfile.setAngkaStatistik1(companyProfileDTO.getAngkaStatistik1());
        companyProfile.setAngkaStatistik2(companyProfileDTO.getAngkaStatistik2());
        companyProfile.setLabelStatistik1(companyProfileDTO.getLabelStatistik1());
        companyProfile.setLabelStatistik2(companyProfileDTO.getLabelStatistik2());
        companyProfile.setTeksBadge(companyProfileDTO.getTeksBadge());
        companyProfile.setAltText(companyProfileDTO.getAltText());
        companyProfile.setJudulSeksiSiapaKami(companyProfileDTO.getJudulSeksiSiapaKami());
        companyProfile.setParagrafUtama(companyProfileDTO.getParagrafUtama());
        companyProfile.setParagrafLanjutan(companyProfileDTO.getParagrafLanjutan());
        companyProfile.setInfoKilat(companyProfileDTO.getInfoKilat());
        companyProfile.setNoVisi(companyProfileDTO.getNoVisi());
        companyProfile.setJudulVisi(companyProfileDTO.getJudulVisi());
        companyProfile.setPoinVisi(companyProfileDTO.getPoinVisi());
        companyProfile.setNoMisi(companyProfileDTO.getNoMisi());
        companyProfile.setJudulMisi(companyProfileDTO.getJudulMisi());
        companyProfile.setPoinMisi(companyProfileDTO.getPoinMisi());
        companyProfile.setJudulSeksiNilai(companyProfileDTO.getJudulSeksiNilai());
        companyProfile.setNilai(companyProfileDTO.getNilai());
        companyProfile.setJudulSeksiLayanan(companyProfileDTO.getJudulSeksiLayanan());
        companyProfile.setSubJudulSeksiLayanan(companyProfileDTO.getSubJudulSeksiLayanan());
        companyProfile.setDeskripsiSampingKanan(companyProfileDTO.getDeskripsiSampingKanan());
        companyProfile.setLayanan(companyProfileDTO.getLayanan());
        companyProfile.setJudulSeksiKendaraan(companyProfileDTO.getJudulSeksiKendaraan());
        companyProfile.setDeskripsiPengantar(companyProfileDTO.getDeskripsiPengantar());
        companyProfile.setTeksTombolLihatSemua(companyProfileDTO.getTeksTombolLihatSemua());
        companyProfile.setKendaraan(companyProfileDTO.getKendaraan());

        companyProfileRepository.save(companyProfile);
        return "Company Profile sudah diperbarui";
    }

    public CompanyProfile viewAdminCompanyProfile(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        return user.getCompanyProfile();
    }

    public String editProfilePicture(MultipartFile profilePicture, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        try {
            String urlImage = fileStorageService.uploadFile(profilePicture);
            user.getAdminProfile().setUrlProfilePicture(urlImage);
            adminProfileRepository.save(user.getAdminProfile());
            return "Profile picture sudah diperbarui";
        } catch (IOException e) {
            return e.getMessage();
        }
    }

    public UserNotifikasi viewNotifikasi(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        List<UserNotifikasi> notifikasis = userNotifikasiRepository.findByUser(user);
        return notifikasis.isEmpty() ? null : notifikasis.get(0);
    }

    public CompanyProfile viewUserCompanyProfile() {
        CompanyProfile companyProfile = companyProfileRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Company Profile tidak ditemukan"));
        return companyProfile;
    }

    public String editProfilePictureUser(MultipartFile profilePicture, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        try {
            String urlImage = fileStorageService.uploadFile(profilePicture);
            user.getUserProfile().setUrlProfilePicture(urlImage);
            userProfileRepository.save(user.getUserProfile());
            return "Profile picture sudah diperbarui";
        } catch (IOException e) {
            return e.getMessage();
        }
    }
}
