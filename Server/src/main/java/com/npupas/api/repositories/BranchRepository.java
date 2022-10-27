package com.npupas.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Pupuseria;

public interface BranchRepository extends JpaRepository<Branch, Long> {
	List<Branch> findByPupuseria(Pupuseria pupuseria);
	
}
