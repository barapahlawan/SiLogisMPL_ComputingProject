package com.BE_SiLogisMPL.ComPro.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class Register {
    @NotBlank(message = "Email tidak boleh kosong")
    @Email(message = "Format email tidak valid")
    private String email;

    @NotBlank(message = "Username tidak boleh kosong")
    @Size(min = 8, max = 20, message = "Username harus memmiliki 8 sampai 20 karakter")
    private String username;

    @NotBlank(message = "Password tidak boleh kosong")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.*_-]).{8,}$", message = "Password minimal 8 karakter, serta harus mengandung angka, huruf besar, huruf kecil, dan karakter spesial")
    private String password;

    @NotBlank(message = "Password tidak boleh kosong")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.*_-]).{8,}$", message = "Password minimal 8 karakter, serta harus mengandung angka, huruf besar, huruf kecil, dan karakter spesial")
    private String confirmPassword;
}
