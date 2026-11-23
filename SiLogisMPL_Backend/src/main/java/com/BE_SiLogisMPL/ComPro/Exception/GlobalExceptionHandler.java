package com.BE_SiLogisMPL.ComPro.Exception;

import java.util.stream.Collectors;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.BE_SiLogisMPL.ComPro.DTO.WebResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public WebResponse<String> handleValidationExceptions(MethodArgumentNotValidException ex) {

        String errorMessages = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return WebResponse.<String>builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .status("BAD REQUEST")
                .data(null)
                .errors(errorMessages)
                .build();
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public WebResponse<String> handleAccessDenied(AccessDeniedException ex) {
        return WebResponse.<String>builder()
                .code(HttpStatus.FORBIDDEN.value())
                .status("FORBIDDEN")
                .data(null)
                .errors("Anda tidak memiliki akses ke fitur ini")
                .build();
    }

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public WebResponse<String> handleDatabaseExceptions(DataAccessException ex) {
        System.err.println("Database error: " + ex.getMessage());
        return WebResponse.<String>builder()
                .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .status("INTERNAL SERVER ERROR")
                .data(null)
                .errors("Terjadi kesalahan pada server. Silakan coba lagi nanti.")
                .build();
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public WebResponse<String> handleRuntimeExceptions(RuntimeException ex) {
        return WebResponse.<String>builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .status("BAD REQUEST")
                .data(null)
                .errors(ex.getMessage())
                .build();
    }
}
