package com.npupas.api.models.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginDTO {
    
		@NotBlank(message = "User Name cannot be blank!")
		@Size(min = 8, message = "User Name has to be 8 characters minimum")
		private String username;
			
			
		@NotBlank(message = "Password cannot be blank!")
		@Size(min = 6,  message = "Password has to be 6 characters minimum")
		private String password;


		public LoginDTO() {
			super();
		}


		public LoginDTO(
				@NotBlank(message = "User Name cannot be blank!") @Size(min = 8, message = "User Name has to be 8 characters minimum") String username,
				@NotBlank(message = "Password cannot be blank!") @Size(min = 6, message = "Password has to be 6 characters minimum") String password) {
				super();
				this.username = username;
				this.password = password;
			}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
						
}

