package com.npupas.api.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.Report;
import com.npupas.api.models.entities.Employee;

public interface ReportRepository extends JpaRepository<Report, Long> {

	List<Report> findByEmployee(Employee employee); 	
	
}