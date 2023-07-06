package com.npupas.api.models.dtos;

import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@NoArgsConstructor
public class RegistrationFormDTO {

	@NotBlank(message = "Name cannot be blank!")
	@Size(min = 5, max = 50, message = "Name has to be 8 characters minimum")
	private String name;

	@NotBlank(message = "DUI cannot be blank!")
	@Size(min = 10, max = 10, message = "DUI has to be 10 characters with dash")
	private String DUI;

	@NotBlank(message = "NIT cannot be blank!")
	@Pattern(regexp = "^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$", message = "NIT invalid format")
	private String NIT;

	@NotBlank(message = "Phone number cannot be blank!")
	@Size(min = 8, max = 8, message = "Phone number has to be 8 characters")
	private String phoneNumber;

	@NotBlank(message = "User Name cannot be blank!")
	@Size(min = 6, message = "User Name has to be 5 characters minimum")
	private String username;

	@NotBlank(message = "Password cannot be blank!")
	@Size(min = 6, max = 32, message = "Password  has to be 6 characters minimum")
	private String password;

	@NotBlank(message = "Name of the pupuseria cannot be blank!")
	@Size(min = 5, message = "Name of the pupuseria has to be 5 characters minimum")
	private String namePupuseria;

	@NotBlank(message = "Name of the branch cannot be blank!")
	@Size(min = 5, message = "Name of the branch has to be 5 characters minimum")
	private String nameBranch;

	@NotBlank(message = "Address cannot be blank!")
	@Size(min = 6, message = "Address has to be 6 characters minimum")
	private String address;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date openingDate;

	public RegistrationFormDTO(
			@NotBlank(message = "Name cannot be blank!") @Size(min = 5, max = 50, message = "Name has to be 8 characters minimum") String name,
			@NotBlank(message = "DUI cannot be blank!") @Size(min = 9, max = 9, message = "DUI has to be 9 characters") String dUI,
			@NotBlank(message = "NIT cannot be blank!") @Size(min = 14, max = 14, message = "NIT has to be 14 characters") String nIT,
			@NotBlank(message = "Phone number cannot be blank!") @Size(min = 8, max = 8, message = "Pohne number has to be 8 characters") String phoneNumber,
			@NotBlank(message = "Username cannot be blank!") @Size(min = 8, message = "Username has to be 8 characters minimum") String username,
			@NotBlank(message = "Password cannot be blank!") @Size(min = 6, max = 32, message = "Password  has to be 6 characters minimum") @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,32}$") String password,
			@NotBlank(message = "Name of the pupuseria cannot be blank!") @Size(min = 8, message = "Name of the pupuseria has to be 8 characters minimum") String namePupuseria,
			@NotBlank(message = "Name of the branch cannot be blank!") @Size(min = 8, message = "Name of the branch has to be 8 characters minimum") String nameBranch,
			@NotBlank(message = "Address cannot be blank!") @Size(min = 6, message = "Address has to be 6 characters minimum") String address,
			@NotBlank(message = "Date cannot be blank!") Date openingDate) {
		super();
		this.name = name;
		this.DUI = dUI;
		this.NIT = nIT;
		this.phoneNumber = phoneNumber;
		this.username = username;
		this.password = password;
		this.namePupuseria = namePupuseria;
		this.nameBranch = nameBranch;
		this.address = address;
		this.openingDate = openingDate;
	}
}
