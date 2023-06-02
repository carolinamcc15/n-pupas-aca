package com.npupas.api.models.dtos;

import java.math.BigDecimal;
import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class AddEmployeeDTO {
	
	@NotBlank(message = "Name cannot be blank!")
	@Size(min = 5, message = "Name has to be 10 characters")
	private String name;
	
	@NotBlank(message = "Username cannot be blank!")
	@Size(min = 5, message = "Username has to be at least 5 characters")
	private String userName;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date hiringDate;
	
	
	private BigDecimal salary;
	
	@NotBlank(message = "Password cannot be blank!")
	@Size(min = 6, max = 32, message = "Code has to be 6 characters minimum")
	private String password;

	
	
	public AddEmployeeDTO() {
		super();
	}

	public AddEmployeeDTO(
			@NotBlank(message = "Name cannot be blank!") @Size(min = 5, message = "Name has to be 10 characters") String name,
			@NotBlank(message = "Username cannot be blank!") @Size(min = 5, message = "Username has to be at least 5 characters") String userName,
			Date hiringDate, @NotBlank(message = "Salary cannot be blank!") BigDecimal salary,
			@NotBlank(message = "Password cannot be blank!") @Size(min = 6, max = 32, message = "Code has to be 6 characters minimum") String password) {
		super();
		this.name = name;
		this.userName = userName;
		this.hiringDate = hiringDate;
		this.salary = salary;
		this.password = password;
	}
}
