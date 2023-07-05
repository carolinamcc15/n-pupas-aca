package com.npupas.api.models.dtos;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class AddReportDTO {
	
	@NotBlank(message = "Report cannot be blank!")
	@Size(min = 4,  message = "Repor has to be 4 characters minimum")
	private String comment;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date reportDate;

	public AddReportDTO(
			@NotBlank(message = "Report cannot be blank!") @Size(min = 4, message = "Repor has to be 4 characters minimum") String comment,
			Date reportDate) {
		super();
		this.comment = comment;
		this.reportDate = reportDate;
	}


}