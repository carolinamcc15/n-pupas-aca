package com.npupas.api.models.dtos;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
@Getter
@Setter
@NoArgsConstructor
public class AddBranchDTO {

	@NotBlank(message = "Name cannot be blank!")
	@Size(min = 1, message = "Name has to be 8 characters minimum")
	private String nameBranch;

	@NotBlank(message = "Name cannot be blank!")
	private String address;

	@NotNull
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date openingDate;

	private Double latitude;
	private Double longitude;
	private String openingTime;
	private String closingTime;

	public AddBranchDTO(
			@NotBlank(message = "Name cannot be blank!") @Size(min = 8, message = "Name has to be 8 characters minimum") String nameBranch,
			@NotBlank(message = "Name cannot be blank!") String address,
			@NotNull Date openingDate) {
		super();
		this.nameBranch = nameBranch;
		this.address = address;
		this.openingDate = openingDate;
	}
}

