package com.npupas.api.services.implementations;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.npupas.api.models.dtos.AddPurchaseDTO;
import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Purchase;
import com.npupas.api.repositories.BranchRepository;
import com.npupas.api.repositories.PurchaseRepository;
import com.npupas.api.services.PurchaseService;

@Service
public class PurchaseServiceImpl implements PurchaseService {

	@Autowired
	PurchaseRepository purchaseRepository;

	@Autowired
	BranchRepository branchRepository;

	@Override
	public List<Purchase> getAllBranchPurchases(Long branchId) {
		Branch branch = branchRepository.findById(branchId).orElse(null);
		if (branch == null) {
			return null;
		}
		List<Purchase> foundBranchPurchase = purchaseRepository.findByBranch(branch);

		return foundBranchPurchase;
	}

	@Override
	public List<Purchase> getTodayBranchPurchases(Long branchId) {
		Branch branch = branchRepository.findById(branchId).orElse(null);
		if (branch == null) {
			return null;
		}

		List<Purchase> foundBranchPurchases = purchaseRepository.findByBranchAndPurchaseDate(branch, new Date());

		return foundBranchPurchases;
	}

	@Override
	public Purchase getOnePurchase(Long idPurchase) {
		Purchase foundPurchase = purchaseRepository.findById(idPurchase).orElse(null);
		return foundPurchase;
	}

	@Override
	public List<Purchase> getPurchasesBetweenDates(Long branchId, Date initialDate, Date finalDate) {
		List<Purchase> purchases = purchaseRepository.findBetweenDates(branchId, initialDate, finalDate);
		return purchases;
	};

	@Override
	public void save(Long branchId, AddPurchaseDTO purchaseDTO) {
		Branch branch = branchRepository.findById(branchId).orElse(null);

		Purchase purchaseToSave = new Purchase();
		purchaseToSave.setAmount(purchaseDTO.getAmount());
		purchaseToSave.setConcept(purchaseDTO.getConcept());
		purchaseToSave.setPurchaseDate(purchaseDTO.getPurchaseDate());
		purchaseToSave.setBranch(branch);

		purchaseRepository.save(purchaseToSave);
	}

	@Override
	public void delete(Long purchaseId) {
		purchaseRepository.deleteById(purchaseId);
	}

	@Override
	public Boolean update(Long purchaseId, AddPurchaseDTO purchaseDTO) {
		Purchase purchase = purchaseRepository.findById(purchaseId).orElse(null);
		if (purchase == null)
			return false;

		purchase.setConcept(purchaseDTO.getConcept());
		purchase.setAmount(purchaseDTO.getAmount());
		purchase.setPurchaseDate(purchaseDTO.getPurchaseDate());

		purchaseRepository.save(purchase);
		return true;
	}
}
