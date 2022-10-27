package com.npupas.api.services;

import java.time.LocalDate;
import java.util.List;

import com.npupas.api.models.dtos.AddSaleDTO;
import com.npupas.api.models.entities.Sale;

public interface SalesService {

	List<Sale> getAllSales(Long branchId);

	List<Sale> getTodaySales(Long branchId);

	List<Sale> getSalesBetweenDates(Long branchId, LocalDate initialDate, LocalDate finalDate);

	Sale getSale(Long branchId, Long idSale);

	Boolean createSale(Long branchId, AddSaleDTO dto);
	
	Boolean updateSale(Long branchId, AddSaleDTO dto, Long saleId);
	
	Boolean deleteSale(Long branchId, Long saleId);
	

}
