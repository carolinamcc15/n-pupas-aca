package com.npupas.api.services;

import com.npupas.api.models.dtos.RegistrationFormDTO;
import com.npupas.api.models.entities.User;

public interface UserService {
	User getUser(Long id);
	User getUserByUsername(String username);
	void register(RegistrationFormDTO userInfo) throws Exception;
	void insertToken(User user, String token) throws Exception;
	Boolean isTokenValid(User user, String token) throws Exception;
	Boolean comparePassword(User user, String passToCompare) throws Exception;
}
