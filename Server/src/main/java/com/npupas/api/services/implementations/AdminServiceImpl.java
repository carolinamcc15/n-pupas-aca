package com.npupas.api.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.npupas.api.repositories.AdminRepository;
import com.npupas.api.repositories.TokenRepository;
import com.npupas.api.services.AdminService;
import com.npupas.api.models.entities.Admin;
import com.npupas.api.models.entities.Token;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    AdminRepository adminRepository;

    @Autowired
    TokenRepository tokenRepository;

    @Override
    public Admin getAdminByToken(String tokenContent) {
        Token token = tokenRepository.findByContent(tokenContent);
        return token.getUser().getAdmin();
    }
}
