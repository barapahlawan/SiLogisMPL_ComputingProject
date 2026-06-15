package com.BE_SiLogisMPL.ComPro.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BE_SiLogisMPL.ComPro.Entity.User;
import com.BE_SiLogisMPL.ComPro.Entity.UserNotifikasi;

@Repository
public interface UserNotifikasiRepository extends JpaRepository<UserNotifikasi, Long> {
    List<UserNotifikasi> findByUser(User user);
}
