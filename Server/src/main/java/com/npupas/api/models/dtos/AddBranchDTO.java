package com.npupas.api.models.dtos;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

public class AddBranchDTO {

	@NotBlank(message = "Name cannot be blank!")
	@Size(min = 1, message = "Name has to be 8 characters minimum")
	private String nameBranch;

	@NotBlank(message = "Name cannot be blank!")
	private String address;

	@NotNull
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate openingDate;

	public AddBranchDTO() {
		super();
	}

	public AddBranchDTO(
			@NotBlank(message = "Name cannot be blank!") @Size(min = 8, message = "Name has to be 8 characters minimum") String nameBranch,
			@NotBlank(message = "Name cannot be blank!") String address,
			@NotNull LocalDate openingDate) {
		super();
		this.nameBranch = nameBranch;
		this.address = address;
		this.openingDate = openingDate;
	}

	public String getNameBranch() {
		return nameBranch;
	}

	public void setNameBranch(String nameBranch) {
		this.nameBranch = nameBranch;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public LocalDate getOpeningDate() {
		return openingDate;
	}

	public void setOpeningDate(LocalDate openingDate) {
		this.openingDate = openingDate;
	}

}
