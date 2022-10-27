package com.npupas.api.models.dtos;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

public class AddReportDTO {
	
	@NotBlank(message = "Report cannot be blank!")
	@Size(min = 4,  message = "Repor has to be 4 characters minimum")
	private String comment;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate reportDate;	

	public AddReportDTO(
			@NotBlank(message = "Report cannot be blank!") @Size(min = 4, message = "Repor has to be 4 characters minimum") String comment,
			LocalDate reportDate) {
		super();
		this.comment = comment;
		this.reportDate = reportDate;
	}

	public AddReportDTO() {
		super();
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


}