package com.BE_SiLogisMPL.ComPro.Exception;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
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
