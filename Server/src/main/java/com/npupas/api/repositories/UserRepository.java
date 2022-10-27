package com.npupas.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findOneByUsername(String username);
}
