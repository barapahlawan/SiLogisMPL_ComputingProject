package com.BE_SiLogisMPL.ComPro.Service;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

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

    // Company profile yang diedit admin = yang ditampilkan di web customer (selalu ID 1)
    private CompanyProfile getCompanyProfileUtama() {
        return companyProfileRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Company Profile tidak ditemukan"));
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    public AdminDashboard viewDashboard() {
        return AdminDashboard.builder()
                .pesananTertunda(orderRepository.findByStatus("PENDING").size())
                .pengirimanBerjalan(orderRepository.findByStatus("ONGOING").size())
                .pesanan(orderRepository.findAll())
                .build();
    }

    public String editProfile(UserProfileDTO userProfileDTO, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));

        String usernameBaru = isBlank(userProfileDTO.getUsername()) ? user.getUsername()
                : userProfileDTO.getUsername().trim();
        String emailBaru = isBlank(userProfileDTO.getEmail()) ? user.getEmail()
                : userProfileDTO.getEmail().trim();

        if (!Objects.equals(user.getUsername(), usernameBaru) && userRepository.existsByUsername(usernameBaru)) {
            throw new RuntimeException("Username sudah dipakai");
        }
        if (!Objects.equals(user.getEmail(), emailBaru) && userRepository.existsByEmail(emailBaru)) {
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

        user.setUsername(usernameBaru);
        user.setEmail(emailBaru);

        userRepository.save(user);

        return "Profil sudah diperbarui";
    }

    public String editAlamat(UserProfileDTO userProfileDTO, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));

        UserProfile userProfile;
        if (user.getUserProfile() == null) {
            userProfile = new UserProfile();
            userProfile.setUser(user);
        } else {
            userProfile = user.getUserProfile();
        }

        userProfile.setAlamat(userProfileDTO.getAlamat());
        userProfileRepository.save(userProfile);

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

        String usernameBaru = isBlank(adminProfileDTO.getUsername()) ? user.getUsername()
                : adminProfileDTO.getUsername().trim();
        String emailBaru = isBlank(adminProfileDTO.getEmail()) ? user.getEmail()
                : adminProfileDTO.getEmail().trim();

        if (!Objects.equals(user.getUsername(), usernameBaru) && userRepository.existsByUsername(usernameBaru)) {
            throw new RuntimeException("Username sudah dipakai");
        }
        if (!Objects.equals(user.getEmail(), emailBaru) && userRepository.existsByEmail(emailBaru)) {
            throw new RuntimeException("Email sudah dipakai");
        }

        AdminProfile adminProfile;
        if (user.getAdminProfile() == null) {
            adminProfile = new AdminProfile();
            adminProfile.setUser(user);
        } else {
            adminProfile = user.getAdminProfile();
        }
        adminProfile.setNoTelepon(adminProfileDTO.getNoTelepon());
        adminProfileRepository.save(adminProfile);

        user.setUsername(usernameBaru);
        user.setEmail(emailBaru);
        userRepository.save(user);

        return "Profil sudah diperbarui";
    }

    public User viewProfileAdmin(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        return user;
    }

    public String editCompanyProfile(MultipartFile file, CompanyProfileDTO companyProfileDTO, String username) {
        userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        CompanyProfile companyProfile = getCompanyProfileUtama();

        if (file != null && !file.isEmpty()) {
            try {
                String urlImage = fileStorageService.uploadFile(file);
                companyProfile.setUrlGambar(urlImage);
            } catch (IOException e) {
                throw new RuntimeException("Gagal mengunggah gambar: " + e.getMessage());
            }
        } else if (!isBlank(companyProfileDTO.getUrlGambar())) {
            companyProfile.setUrlGambar(companyProfileDTO.getUrlGambar());
        }

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
        userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        return getCompanyProfileUtama();
    }

    public String editProfilePicture(MultipartFile profilePicture, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        try {
            String urlImage = fileStorageService.uploadFile(profilePicture);
            AdminProfile adminProfile = user.getAdminProfile();
            if (adminProfile == null) {
                adminProfile = new AdminProfile();
                adminProfile.setUser(user);
            }
            adminProfile.setUrlProfilePicture(urlImage);
            adminProfileRepository.save(adminProfile);
            return urlImage;
        } catch (IOException e) {
            throw new RuntimeException("Gagal mengunggah foto profil: " + e.getMessage());
        }
    }

    public List<UserNotifikasi> viewNotifikasi(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        return userNotifikasiRepository.findByUser(user).stream()
                .filter(n -> n.getOrder() != null)
                .sorted(Comparator.comparing(UserNotifikasi::getId).reversed())
                .toList();
    }

    public String markNotifikasiRead(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        List<UserNotifikasi> notifikasis = userNotifikasiRepository.findByUser(user);
        notifikasis.forEach(n -> n.setSudahDibaca(true));
        userNotifikasiRepository.saveAll(notifikasis);
        return "Semua notifikasi sudah dibaca";
    }

    public CompanyProfile viewUserCompanyProfile() {
        return getCompanyProfileUtama();
    }

    public String editProfilePictureUser(MultipartFile profilePicture, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        try {
            String urlImage = fileStorageService.uploadFile(profilePicture);
            UserProfile userProfile = user.getUserProfile();
            if (userProfile == null) {
                userProfile = new UserProfile();
                userProfile.setUser(user);
            }
            userProfile.setUrlProfilePicture(urlImage);
            userProfileRepository.save(userProfile);
            return urlImage;
        } catch (IOException e) {
            throw new RuntimeException("Gagal mengunggah foto profil: " + e.getMessage());
        }
    }
}
