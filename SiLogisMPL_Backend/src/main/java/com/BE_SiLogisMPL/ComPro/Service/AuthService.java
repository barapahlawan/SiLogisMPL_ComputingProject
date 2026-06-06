package com.BE_SiLogisMPL.ComPro.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.BE_SiLogisMPL.ComPro.DTO.Login;
import com.BE_SiLogisMPL.ComPro.DTO.Register;
import com.BE_SiLogisMPL.ComPro.DTO.RegisterAdminDTO;
import com.BE_SiLogisMPL.ComPro.Entity.AdminProfile;
import com.BE_SiLogisMPL.ComPro.Entity.CompanyProfile;
import com.BE_SiLogisMPL.ComPro.Entity.User;
import com.BE_SiLogisMPL.ComPro.Entity.UserNotifikasi;
import com.BE_SiLogisMPL.ComPro.Entity.UserProfile;
import com.BE_SiLogisMPL.ComPro.Repository.AdminProfileRepository;
import com.BE_SiLogisMPL.ComPro.Repository.CompanyProfileRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UserNotifikasiRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UserProfileRepository;
import com.BE_SiLogisMPL.ComPro.Repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserNotifikasiRepository userNotifikasiRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AdminProfileRepository adminProfileRepository;

    @Autowired
    private CompanyProfileRepository companyProfileRepository;

    public String register(Register register) {
        if (userRepository.existsByEmail(register.getEmail())) {
            throw new RuntimeException("Email sudah terdaftar");
        }

        if (userRepository.existsByUsername(register.getUsername())) {
            throw new RuntimeException("Username sudah terdaftar");
        }

        if (!register.getPassword().equals(register.getConfirmPassword())) {
            throw new RuntimeException("Password salah");
        }

        String hashPassword = passwordEncoder.encode(register.getPassword());

        User user = User.builder()
                .username(register.getUsername())
                .email(register.getEmail())
                .password(hashPassword)
                .role("USER")
                .build();
        userRepository.save(user);

        UserNotifikasi userNotifikasi = UserNotifikasi.builder()
                .user(user)
                .build();

        userNotifikasiRepository.save(userNotifikasi);

        UserProfile userProfile = UserProfile.builder()
                .user(user)
                .build();

        userProfileRepository.save(userProfile);

        return "Akun berhasil dibuat";
    }

    public String login(Login login) {
        User user = userRepository.findByEmail(login.getEmail())
                .orElseThrow(() -> new RuntimeException("Email tidak terdaftar"));

        if (!passwordEncoder.matches(login.getPassword(), user.getPassword())) {
            throw new RuntimeException("Password Salah");
        }

        String token = jwtService.generateToken(user);

        return "Berhasil login sebagai " + user.getRole() + " ini tokennya = " + token;
    }

    public String createAdmin(RegisterAdminDTO registerAdminDTO) {
        if (userRepository.existsByEmail(registerAdminDTO.getEmail())) {
            throw new RuntimeException("Email sudah terdaftar");
        }

        if (userRepository.existsByUsername(registerAdminDTO.getUsername())) {
            throw new RuntimeException("Username sudah terdaftar");
        }

        if (companyProfileRepository.count() == 0) {
            CompanyProfile companyProfile = CompanyProfile.builder().build();
            companyProfileRepository.save(companyProfile);
        }

        String hashPassword = passwordEncoder.encode(registerAdminDTO.getPassword());

        User user = User.builder()
                .username(registerAdminDTO.getUsername())
                .email(registerAdminDTO.getEmail())
                .password(hashPassword)
                .role("ADMIN")
                .companyProfile(companyProfileRepository.getReferenceById(1L))
                .build();

        userRepository.save(user);

        AdminProfile adminProfile = AdminProfile.builder()
                .user(user)
                .build();

        adminProfileRepository.save(adminProfile);

        return "Akun berhasil dibuat";
    }
}
