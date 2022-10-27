package com.npupas.api.services;

import com.npupas.api.models.entities.User;

public interface AuthService {

	void login(String userName, String password);

	void signUp(User user);

}
