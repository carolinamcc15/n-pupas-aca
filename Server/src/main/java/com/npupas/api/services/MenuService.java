package com.npupas.api.services;

import java.util.List;

import com.npupas.api.models.dtos.AddProductDTO;
import com.npupas.api.models.entities.Product;

public interface MenuService {
	List<Product> getAllProducts(Long pupuseriaId);
	Product getOneProduct(String tokenStr, Long productId);
	Boolean createProduct(String token , AddProductDTO dto);
	Boolean updateProduct(String tokenStr, Long productId, AddProductDTO dto);
	Boolean deleteProduct(String tokenStr, Long productId);
}
