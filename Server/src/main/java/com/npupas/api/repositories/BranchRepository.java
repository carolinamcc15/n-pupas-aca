package com.npupas.api.repositories;

import java.util.List;

import com.npupas.api.models.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Pupuseria;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BranchRepository extends JpaRepository<Branch, Long> {
	List<Branch> findByPupuseria(Pupuseria pupuseria);

	List<Branch> getByPupuseriaAdminIsNot(Admin admin);

	@Query("SELECT DISTINCT b FROM branch b WHERE b.id = :id")
	List<Branch> findBranchById(@Param("id") Long id);
}