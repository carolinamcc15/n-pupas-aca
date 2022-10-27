package com.npupas.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npupas.api.models.entities.SalesDetail;

public interface SalesDetailsRepository extends JpaRepository<SalesDetail, Long>{

}
