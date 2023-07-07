package com.npupas.api.services;

import java.util.List;

import com.npupas.api.models.entities.Admin;
import com.npupas.api.models.entities.Purchase;
import com.npupas.api.models.entities.Report;
import com.npupas.api.models.dtos.AddReportDTO;

public interface ReportService {

	Report getOneReport(Long idReport);
	
	void save(Admin admin, Long employeeId, AddReportDTO report);

	void delete( Long reportId);
	
	Boolean update(Long reportId, AddReportDTO reportDTO);

	List<Report> getAllReport(Long adminId);

	void generateSalesMonthlyReport();
	
}