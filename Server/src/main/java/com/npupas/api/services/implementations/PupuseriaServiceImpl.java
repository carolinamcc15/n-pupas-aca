package com.npupas.api.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.npupas.api.models.entities.Admin;
import com.npupas.api.models.entities.Pupuseria;
import com.npupas.api.models.entities.Token;
import com.npupas.api.repositories.PupuseriaRepository;
import com.npupas.api.repositories.TokenRepository;
import com.npupas.api.services.PupuseriaService;

@Service
public class PupuseriaServiceImpl implements PupuseriaService {

	@Autowired
	PupuseriaRepository pupuseriaRepository;

	@Autowired
	TokenRepository tokenRepository;
	
	@Override
	public Pupuseria getPupuseria(String tokenStr) {
		Token token = tokenRepository.findByContent(tokenStr);
		
		Admin admin = token.getUser().getAdmin();
		
		if(admin == null) return null;
		
		return admin.getPupuseria();
	}

}
