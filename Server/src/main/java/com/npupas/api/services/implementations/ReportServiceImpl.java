package com.npupas.api.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.npupas.api.models.dtos.AddReportDTO;
import com.npupas.api.models.entities.Admin;
import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Employee;
import com.npupas.api.models.entities.Purchase;
import com.npupas.api.models.entities.Report;
import com.npupas.api.repositories.AdminRepository;
import com.npupas.api.repositories.BranchRepository;
import com.npupas.api.repositories.EmployeeRepository;
import com.npupas.api.repositories.ReportRepository;
import com.npupas.api.services.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

	@Autowired
	ReportRepository reportRepository;

	@Autowired
	BranchRepository branchRepository;

	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	AdminRepository adminRepository;

	@Autowired
	private StatsService statsService;

	@Autowired
	private PupuseriaService pupuseriaService;

	@Autowired
	private EmailService emailService;

	@Value("${mail.email}")
	private String email;


	@Override
	public Report getOneReport(Long reportId) {
		Report foundReport = reportRepository.findById(reportId).orElse(null);
		return foundReport;
	}
	
	@Override
	public List<Report> getAllReport(Long adminId) {
		Admin admin = adminRepository.findById(adminId).orElse(null);
		if (admin == null)
			return null;

		return admin.getReports();
	}


	@Override
	public void save(Admin admin, Long employeeId, AddReportDTO reportDTO) {
		Report report = new Report();
		Employee employee = employeeRepository.findById(employeeId).get();

		if (employee == null) {
			return;
		}

		report.setAdmin(admin);
		report.setEmployee(employee);
		report.setComment(reportDTO.getComment());
		report.setReportDate(reportDTO.getReportDate());

		reportRepository.save(report);

	}

	@Override
	public void delete(Long reportId) {
		reportRepository.deleteById(reportId);
	}

	@Override
	public Boolean update(Long reportId, AddReportDTO reportDTO) {
		Report report = reportRepository.findById(reportId).orElse(null);
		if (report == null)
			return false;

		report.setComment(reportDTO.getComment());
		report.setReportDate(reportDTO.getReportDate());

		reportRepository.save(report);
		return true;
	}

	@Scheduled(cron = "0 0 0 1 * ?")
	public void generateSalesMonthlyReport() {

		List<Long> adminIds = adminRepository.findAllAdminIds();

		for (Long adminId : adminIds) {
			SalesBranchesDTO salesChartsDTO = statsService.getSalesChartsBranches(adminId);

			if (salesChartsDTO == null) {
				continue;
			}

			salesChartsDTO.calculateSalesStatistics();

			Pupuseria pupuseria = pupuseriaService.getPupuseriaByAdminId(adminId);
			if (pupuseria == null) {
				continue;
			}

			String ownerEmail = pupuseria.getAdmin().getUser().getUsername();

			MailMessageDTO mail = new MailMessageDTO();
			mail.setMailTo(ownerEmail);
			mail.setSubject("Sales Report for Branches - Admin ID: " + adminId);
			mail.setFrom(email);

			try {
				emailService.sendSalesBranchesEmail(mail, pupuseria.getName(), salesChartsDTO);
			} catch (Exception e) {
				System.out.println("Error sending email: " + e.getMessage());
				// Handle errors if the email sending fails
			}
		}
	}
}