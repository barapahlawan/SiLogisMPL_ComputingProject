package com.BE_SiLogisMPL.ComPro.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BE_SiLogisMPL.ComPro.Entity.UserNotifikasi;

@Repository
public interface UserNotifikasiRepository extends JpaRepository<UserNotifikasi, Long> {

}
