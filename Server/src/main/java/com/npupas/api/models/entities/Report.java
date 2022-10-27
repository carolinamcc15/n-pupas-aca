package com.npupas.api.models.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity(name= "report")
public class Report {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "report_id_gen", sequenceName = "report_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_id_gen")
	private Long ID;
	
	@Column
	private String comment;
	
	@Column(name = "report_date")
	private LocalDate reportDate;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "id_admin", nullable = true)
	private Admin admin;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "id_employee", nullable = true)
	private Employee employee;
	

	public Report() {
		super();
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public LocalDate getReportDate() {
		return reportDate;
	}

	public void setReportDate(LocalDate reportDate) {
		this.reportDate = reportDate;
	}

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	
		
}