package com.npupas.api.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.npupas.api.models.entities.ProductType;
import com.npupas.api.repositories.ProductTypeRepository;
import com.npupas.api.services.ProductTypeService;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {
    @Autowired
    ProductTypeRepository productTypeRepo;

    public List<ProductType> getAllProductTypes() {
        return productTypeRepo.findAll();
    }
}
