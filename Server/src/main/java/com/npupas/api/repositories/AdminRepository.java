package com.npupas.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{

}
