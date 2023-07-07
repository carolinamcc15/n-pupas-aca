package com.npupas.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.Admin;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Long>{
    List<Long> findAllAdminIds();
}
