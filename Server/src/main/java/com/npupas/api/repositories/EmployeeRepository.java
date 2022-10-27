package com.npupas.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	List<Employee> findByBranch(Branch branch);
}
