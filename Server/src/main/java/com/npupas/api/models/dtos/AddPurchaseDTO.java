package com.npupas.api.models.dtos;

import java.math.BigDecimal;
import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@NoArgsConstructor
public class AddPurchaseDTO {
	
	@NotBlank(message = "Concept cannot be blank!")
	@Size(min = 5,  message = "The concept must have a minimum of 5 characters")
	private String concept;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date purchaseDate;
	
	private BigDecimal amount;

	public AddPurchaseDTO(
			@NotBlank(message = "Concept cannot be blank!") @Size(min = 5, message = "The concept must have a minimum of 5 characters") String concept,
			@NotBlank(message = "Date cannot be blank!") Date purchaseDate,
			@NotBlank(message = "Amount cannot be blank!") BigDecimal amount) {
		super();
		this.concept = concept;
		this.purchaseDate = purchaseDate;
		this.amount = amount;
	}
}
