package com.npupas.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.Token;
import com.npupas.api.models.entities.User;

public interface TokenRepository extends JpaRepository<Token, Long> {
	List<Token> findByUserAndActive(User user, Boolean active);
	Token findByContent(String tokenContent);
}
