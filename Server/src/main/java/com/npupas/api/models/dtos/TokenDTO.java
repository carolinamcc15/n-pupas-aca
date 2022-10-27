package com.npupas.api.models.dtos;

public class TokenDTO {
	private String token;
	
	private String role;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public TokenDTO(String token) {
		super();
		this.token = token;
	}
	

	public TokenDTO(String token, String role) {
		super();
		this.token = token;
		this.role = role;
	}

	public TokenDTO() {
		super();
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
