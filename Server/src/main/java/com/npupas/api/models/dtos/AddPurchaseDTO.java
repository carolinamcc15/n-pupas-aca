package com.npupas.api.models.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

public class AddPurchaseDTO {
	
	@NotBlank(message = "Concept cannot be blank!")
	@Size(min = 5,  message = "The concept must have a minimum of 5 characters")
	private String concept;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate purchaseDate;
	
	private BigDecimal amount;

	public AddPurchaseDTO() {
		super();
	}

	public AddPurchaseDTO(
			@NotBlank(message = "Concept cannot be blank!") @Size(min = 5, message = "The concept must have a minimum of 5 characters") String concept,
			@NotBlank(message = "Date cannot be blank!") LocalDate purchaseDate,
			@NotBlank(message = "Amount cannot be blank!") BigDecimal amount) {
		super();
		this.concept = concept;
		this.purchaseDate = purchaseDate;
		this.amount = amount;
	}

	public String getConcept() {
		return concept;
	}

	public void setConcept(String concept) {
		this.concept = concept;
	}

	public LocalDate getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(LocalDate purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
}
