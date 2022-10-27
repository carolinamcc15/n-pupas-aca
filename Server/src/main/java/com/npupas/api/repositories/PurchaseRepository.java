package com.npupas.api.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
	List<Purchase> findByBranch(Branch branch);

	List<Purchase> findByBranchAndPurchaseDate(Branch branch, LocalDate date);

	@Query(value = "SELECT * FROM purchase WHERE id_branch = :branchId AND purchase_date >= :initialDate AND purchase_date <= :finalDate", nativeQuery = true)
	List<Purchase> findBetweenDates(Long branchId, LocalDate initialDate, LocalDate finalDate);
}
