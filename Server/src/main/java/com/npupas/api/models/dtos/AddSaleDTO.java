package com.npupas.api.models.dtos;

import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

public class AddSaleDTO {
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate date;
	
	
	private List<SalesDetailsDTO> details;
	
	

	
	public AddSaleDTO(LocalDate date,
			@NotEmpty(message = "You must provide the sale details") List<SalesDetailsDTO> details) {
		super();
		this.date = date;
		this.details = details;
	}

	public AddSaleDTO() {
		super();
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public List<SalesDetailsDTO> getDetails() {
		return details;
	}

	public void setDetails(List<SalesDetailsDTO> details) {
		this.details = details;
	}
}
