package com.npupas.api.services;

import java.util.Date;
import java.util.List;

import com.npupas.api.models.dtos.AddPurchaseDTO;
import com.npupas.api.models.entities.Purchase;

public interface PurchaseService {

	List<Purchase> getAllBranchPurchases(Long branchId);

	List<Purchase> getTodayBranchPurchases(Long branchId);

	List<Purchase> getPurchasesBetweenDates(Long branchId, Date initialDate, Date finalDate);

	Purchase getOnePurchase(Long idPurchase);

	void save(Long branchId, AddPurchaseDTO purchase);

	void delete(Long purchaseId);

	Boolean update(Long purchaseId, AddPurchaseDTO purchaseDTO);

}
