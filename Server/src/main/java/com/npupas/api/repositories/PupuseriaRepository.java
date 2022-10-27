package com.npupas.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.Admin;
import com.npupas.api.models.entities.Pupuseria;

public interface PupuseriaRepository extends JpaRepository<Pupuseria, Long> {
	Pupuseria findOneByAdmin(Admin admin);
	Pupuseria findOneByName(String name);
}
