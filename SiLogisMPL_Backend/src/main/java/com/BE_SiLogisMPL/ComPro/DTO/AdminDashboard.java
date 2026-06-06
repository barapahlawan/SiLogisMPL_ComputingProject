package com.BE_SiLogisMPL.ComPro.DTO;

import java.util.List;

import com.BE_SiLogisMPL.ComPro.Entity.Order;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class AdminDashboard {
    private int pesananTertunda;
    private int pengirimanBerjalan;
    private List<Order> pesanan;
}
