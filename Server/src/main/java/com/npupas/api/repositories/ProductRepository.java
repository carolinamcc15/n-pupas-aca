package com.npupas.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.Product;
import com.npupas.api.models.entities.Pupuseria;

public interface ProductRepository extends JpaRepository<Product, Long>{
	List<Product> findByPupuseria(Pupuseria pupuseria); 
}
