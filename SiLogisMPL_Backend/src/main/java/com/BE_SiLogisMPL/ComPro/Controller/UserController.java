package com.BE_SiLogisMPL.ComPro.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BE_SiLogisMPL.ComPro.DTO.AdminDashboard;
import com.BE_SiLogisMPL.ComPro.DTO.AdminProfileDTO;
import com.BE_SiLogisMPL.ComPro.DTO.CompanyProfileDTO;
import com.BE_SiLogisMPL.ComPro.DTO.UlasanDTO;
import com.BE_SiLogisMPL.ComPro.DTO.UserProfileDTO;
import com.BE_SiLogisMPL.ComPro.DTO.WebResponse;
import com.BE_SiLogisMPL.ComPro.Entity.CompanyProfile;
import com.BE_SiLogisMPL.ComPro.Entity.Ulasan;
import com.BE_SiLogisMPL.ComPro.Entity.User;
import com.BE_SiLogisMPL.ComPro.Entity.UserNotifikasi;
import com.BE_SiLogisMPL.ComPro.Service.UlasanService;
import com.BE_SiLogisMPL.ComPro.Service.UserService;

@RestController
@RequestMapping("user")
public class UserController {

        @Autowired
        private UserService userService;

        @Autowired
        private UlasanService ulasanService;

        @GetMapping("/admin/dashboard")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<AdminDashboard> viewDashboard() {
                AdminDashboard token = userService.viewDashboard();
                return WebResponse.<AdminDashboard>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PatchMapping("/edit/profile")
        @PreAuthorize("hasRole('USER')")
        public WebResponse<String> editProfile(@RequestBody UserProfileDTO userProfileDTO,
                        Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                String token = userService.editProfile(userProfileDTO, username);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PatchMapping("/edit/alamat")
        @PreAuthorize("hasRole('USER')")
        public WebResponse<String> editAlamat(@RequestBody UserProfileDTO userProfileDTO,
                        Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                String token = userService.editAlamat(userProfileDTO, username);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/profile")
        @PreAuthorize("hasRole('USER')")
        public WebResponse<User> viewProfile(Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                User token = userService.viewProfile(username);
                return WebResponse.<User>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PatchMapping("/admin/edit/profile")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<String> editProfileAdmin(@RequestBody AdminProfileDTO adminProfileDTO,
                        Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                String token = userService.editProfileAdmin(adminProfileDTO, username);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/admin/profile")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<User> viewProfileAdmin(Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                User token = userService.viewProfileAdmin(username);
                return WebResponse.<User>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PatchMapping(value = "/admin/edit/companyprofile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<String> editCompanyProfile(
                        @RequestPart(value = "fileGambar", required = false) MultipartFile file,
                        @RequestPart(value = "companyProfile") CompanyProfileDTO companyProfileDTO,
                        Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                String token = userService.editCompanyProfile(file, companyProfileDTO, username);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/admin/companyprofile")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<CompanyProfile> viewAdminCompanyProfile(Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                CompanyProfile token = userService.viewAdminCompanyProfile(username);
                return WebResponse.<CompanyProfile>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PatchMapping(value = "/admin/edit/profilepicture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<String> editProfilePicture(@RequestParam("fileGambarOtomatis") MultipartFile file,
                        Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                String token = userService.editProfilePicture(file, username);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/notifikasi")
        @PreAuthorize("hasRole('USER')")
        public WebResponse<UserNotifikasi> viewNotifikasi(Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                UserNotifikasi token = userService.viewNotifikasi(username);
                return WebResponse.<UserNotifikasi>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/companyprofile")
        @PreAuthorize("hasRole('USER')")
        public WebResponse<CompanyProfile> viewUserCompanyProfile(Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                CompanyProfile token = userService.viewUserCompanyProfile(username);
                return WebResponse.<CompanyProfile>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PostMapping("/create/ulasan/{orderId}")
        @PreAuthorize("hasRole('USER')")
        public WebResponse<String> createUlasan(@RequestBody UlasanDTO ulasanDTO, @PathVariable Long orderId,
                        Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                String token = ulasanService.createUlasan(username, orderId, ulasanDTO);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/view/ulasan")
        @PreAuthorize("hasRole('USER')")
        public WebResponse<List<Ulasan>> viewUlasan() {
                List<Ulasan> token = ulasanService.viewUlasan();
                return WebResponse.<List<Ulasan>>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/admin/view/ulasan")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<List<Ulasan>> viewUlasanAdmin() {
                List<Ulasan> token = ulasanService.viewUlasan();
                return WebResponse.<List<Ulasan>>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PostMapping("/admin/reply/ulasan/{ulasanId}")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<String> replyUlasan(Authentication authentication, @PathVariable Long ulasanId,
                        @RequestBody UlasanDTO ulasanDTO) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                String token = ulasanService.replyUlasan(ulasanId, ulasanDTO);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @DeleteMapping("/admin/delete/ulasan/{ulasanId}")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<String> deleteUlasan(Authentication authentication, @PathVariable Long ulasanId) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                String token = ulasanService.deleteUlasan(ulasanId);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PostMapping(value = "/edit/profilepicture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        @PreAuthorize("hasRole('USER')")
        public WebResponse<String> editProfilePictureUser(@RequestParam("file") MultipartFile profilePicture,
                        Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                String token = userService.editProfilePictureUser(profilePicture, username);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }
}
