package com.npupas.api.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Sale;

public interface SalesRepository extends JpaRepository<Sale, Long> {

	List<Sale> findByBranch(Branch branch);

	List<Sale> findBySaleDate(LocalDate saleDate);

	List<Sale> findBySaleDateAndBranch(LocalDate saleDate, Branch branch);

	@Query(value = "SELECT * FROM sale WHERE id_branch = :branchId AND sale_date >= :initialDate AND sale_date <= :finalDate", nativeQuery = true)
	List<Sale> findBetweenDates(Long branchId, LocalDate initialDate, LocalDate finalDate);

}
