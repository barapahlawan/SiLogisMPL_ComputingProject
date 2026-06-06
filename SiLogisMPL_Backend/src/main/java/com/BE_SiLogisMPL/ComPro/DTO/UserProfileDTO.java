package com.BE_SiLogisMPL.ComPro.DTO;

import java.util.List;
import java.util.Map;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserProfileDTO {
    private String username;
    private String email;
    private String noTelepon;
    private String perusahaan;
    private String jabatan;
    private String npwpPerusahaan;
    private String industri;
    private List<Map<String, String>> Alamat;
}
