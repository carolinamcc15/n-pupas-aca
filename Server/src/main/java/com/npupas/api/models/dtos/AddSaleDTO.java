package com.npupas.api.models.dtos;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@NoArgsConstructor
public class AddSaleDTO {
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date date;
	
	private List<SalesDetailsDTO> details;

	public AddSaleDTO(Date date,
			@NotEmpty(message = "You must provide the sale details") List<SalesDetailsDTO> details) {
		super();
		this.date = date;
		this.details = details;
	}
}
