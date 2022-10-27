package com.npupas.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.Mass;

public interface MassRepository extends JpaRepository<Mass, Long>{
	Mass findOneByMass(String mass);
}
