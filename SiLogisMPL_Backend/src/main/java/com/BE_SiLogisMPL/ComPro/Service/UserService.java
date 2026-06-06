package com.BE_SiLogisMPL.ComPro.Service;

import java.io.IOException;

import org.modelmapper.ModelMapper;
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
    private ModelMapper modelMapper;

    @Autowired
    private CompanyProfileRepository companyProfileRepository;

    @Autowired
    private FileStorageService fileStorageService;

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

        if (userRepository.existsByUsername(userProfileDTO.getUsername())) {
            throw new RuntimeException("Username sudah dipakai");
        }

        if (userRepository.existsByEmail(userProfileDTO.getEmail())) {
            throw new RuntimeException("Email sudah dipakai");
        }

        UserProfile userProfileUpdate = user.getUserProfile().toBuilder()
                .noTelepon(userProfileDTO.getNoTelepon())
                .perusahaan(userProfileDTO.getPerusahaan())
                .jabatan(userProfileDTO.getJabatan())
                .npwpPerusahaan(userProfileDTO.getNpwpPerusahaan())
                .industri(userProfileDTO.getIndustri())
                .Alamat(userProfileDTO.getAlamat())
                .build();

        userProfileRepository.save(userProfileUpdate);

        User userUpdate = user.toBuilder()
                .username(userProfileDTO.getUsername())
                .email(userProfileDTO.getEmail())
                .build();

        userRepository.save(userUpdate);

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

        if (userRepository.existsByUsername(adminProfileDTO.getUsername())) {
            throw new RuntimeException("Username sudah dipakai");
        }

        if (userRepository.existsByEmail(adminProfileDTO.getEmail())) {
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

    public String editCompanyProfile(CompanyProfileDTO companyProfileDTO, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        CompanyProfile companyProfile = user.getCompanyProfile();
        try {
            System.out.println("outsave");
            if (companyProfileDTO.getFileGambarOtomatis() != null && !companyProfileDTO.getFileGambarOtomatis().isEmpty()) {
                String urlImage = fileStorageService.uploadFile(companyProfileDTO.getFileGambarOtomatis());
                companyProfileDTO.setUrlGambarOtomatis(urlImage);
            }
        } catch (IOException e) {
            System.out.println("outgagal");
            return e.getMessage();
        }
        companyProfileDTO.setFileGambarOtomatis(null);
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
        companyProfile.setUrlGambarOtomatis(companyProfileDTO.getUrlGambarOtomatis());
        companyProfile.setUrlGambarManual(companyProfileDTO.getUrlGambarManual());
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
        return user.getUserNotifikasi();
    }

    public CompanyProfile viewUserCompanyProfile(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Username tidak ditemukan"));
        CompanyProfile companyProfile = companyProfileRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Company Profile tidak ditemukan"));
        return companyProfile;
    }
}
