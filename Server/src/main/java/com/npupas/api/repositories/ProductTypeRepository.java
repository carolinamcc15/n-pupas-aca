package com.npupas.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.ProductType;

public interface ProductTypeRepository extends JpaRepository<ProductType, Long>{
	ProductType findByType(String type);
}
