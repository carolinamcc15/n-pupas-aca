package com.npupas.api.models.dtos;

import com.npupas.api.enums.Mass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SalesDetailsDTO {
	
	@Min(value = 1, message = "You must provide at least 1 product.")
	private Long amount;
	@Min(value = 0)
	private BigDecimal total;
	
	@Min(value = 1, message = "You must provide at least 1 product.")
	private Long idProducto;

	private Mass mass;
}
