package com.BE_SiLogisMPL.ComPro.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BE_SiLogisMPL.ComPro.DTO.OrderDTO;
import com.BE_SiLogisMPL.ComPro.DTO.WebResponse;
import com.BE_SiLogisMPL.ComPro.Entity.Order;
import com.BE_SiLogisMPL.ComPro.Service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("order")
public class OrderController {

        @Autowired
        private OrderService orderService;

        @PostMapping("/create")
        @PreAuthorize("hasRole('USER')")
        public WebResponse<String> createOrder(@Valid @RequestBody OrderDTO orderDTO, Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                String token = orderService.createOrder(orderDTO, username);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/view")
        @PreAuthorize("hasRole('USER')")
        public WebResponse<Optional<Order>> viewOrder(Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                Optional<Order> token = orderService.viewAllOrder(username);
                return WebResponse.<Optional<Order>>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/view/{status}")
        @PreAuthorize("hasRole('USER')")
        public WebResponse<List<Order>> viewOrder(
                        @PathVariable("status") String status, Authentication authentication) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication
                                .getPrincipal();
                String username = userDetails.getUsername();
                List<Order> token = orderService.viewOrder(username, status);
                return WebResponse.<List<Order>>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PostMapping("/invoice/{id}")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<String> uploadInvoice(@RequestParam("file") MultipartFile file,
                        @PathVariable("id") Long id) {
                String token = orderService.uploadInvoice(file, id);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PatchMapping("/{id}/{status}")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<String> verifikasiPesanan(@PathVariable("id") Long id,
                        @PathVariable("status") String status) {
                String token = orderService.verifikasiPesanan(id, status);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @PatchMapping("/{id}/pengiriman/{statusPengiriman}")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<String> updateStatusPengiriman(@PathVariable("id") Long id,
                        @PathVariable("statusPengiriman") String statusPengiriman) {
                String token = orderService.updateStatusPengiriman(id, statusPengiriman);
                return WebResponse.<String>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/{id}")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<Order> detailPesanan(@PathVariable("id") Long id) {
                Order token = orderService.detailPesanan(id);
                return WebResponse.<Order>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }

        @GetMapping("/")
        @PreAuthorize("hasRole('ADMIN')")
        public WebResponse<List<Order>> viewPesanan() {
                List<Order> token = orderService.viewPesanan();
                return WebResponse.<List<Order>>builder()
                                .code(HttpStatus.OK.value())
                                .status(HttpStatus.OK.getReasonPhrase())
                                .data(token)
                                .build();
        }
}
