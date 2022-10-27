package com.npupas.api.services.implementations;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.npupas.api.models.entities.User;
import com.npupas.api.repositories.UserRepository;
import com.npupas.api.services.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	private static Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

	@Override
	public void login(String userName, String password) {
//		UsernamePasswordAuthenticationToken userNamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
//				userName, password);
//		authenticationManager.authenticate(userNamePasswordAuthenticationToken);
//
//		if (userNamePasswordAuthenticationToken.isAuthenticated()) {
//			SecurityContextHolder.getContext().setAuthentication(userNamePasswordAuthenticationToken);
//			logger.debug(String.format("Auto login %s successfully!", userName));
//		}
	}

	@Override
	public void signUp(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}

}
