package com.BE_SiLogisMPL.ComPro.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BE_SiLogisMPL.ComPro.DTO.Login;
import com.BE_SiLogisMPL.ComPro.DTO.Register;
import com.BE_SiLogisMPL.ComPro.DTO.RegisterAdminDTO;
import com.BE_SiLogisMPL.ComPro.DTO.WebResponse;
import com.BE_SiLogisMPL.ComPro.Service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public WebResponse<String> register(@Valid @RequestBody Register register) {
        String token = authService.register(register);
        return WebResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .status(HttpStatus.OK.getReasonPhrase())
                .data(token)
                .build();
    }

    @PostMapping("/login")
    public WebResponse<String> login(@Valid @RequestBody Login login) {
        String token = authService.login(login);
        return WebResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .status(HttpStatus.OK.getReasonPhrase())
                .data(token)
                .build();
    }

    @PostMapping("/createAdmin")
    public WebResponse<String> createAdmin(@Valid @RequestBody RegisterAdminDTO registerAdminDTO) {
        String token = authService.createAdmin(registerAdminDTO);
        return WebResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .status(HttpStatus.OK.getReasonPhrase())
                .data(token)
                .build();
    }
}
