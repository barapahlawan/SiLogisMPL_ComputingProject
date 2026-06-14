package com.BE_SiLogisMPL.ComPro.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BE_SiLogisMPL.ComPro.Entity.Ulasan;

@Repository
public interface UlasanRepository extends JpaRepository<Ulasan, Long> {

}
