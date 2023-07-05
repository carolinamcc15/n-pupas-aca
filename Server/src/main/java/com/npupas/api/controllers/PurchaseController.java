package com.npupas.api.controllers;

import java.util.List;

import javax.validation.Valid;

import com.npupas.api.models.dtos.AddPurchaseDTO;
import com.npupas.api.models.dtos.MessageDTO;
import com.npupas.api.models.entities.Purchase;
import com.npupas.api.services.BranchService;
import com.npupas.api.services.PurchaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.npupas.api.utils.DateUtils.standardFormat;

@RestController
@RequestMapping("/pupuserias/branches")
public class PurchaseController {
	@Autowired
	PurchaseService purchaseService;

	@Autowired
	BranchService branchService;

	@GetMapping("/{id}/purchases")
	public ResponseEntity<List<Purchase>> getAll(@PathVariable("id") Long branchId) {
		try {
			List<Purchase> purchases = purchaseService.getAllBranchPurchases(branchId);
			if (purchases == null)
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

			return new ResponseEntity<List<Purchase>>(purchases, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}/purchases/report")
	public ResponseEntity<List<Purchase>> getBetweenDates(@PathVariable("id") Long branchId,
			@RequestParam("initialDate") String initialDateStr, @RequestParam("finalDate") String finalDateStr) {
		try {

			List<Purchase> purchases = purchaseService.getPurchasesBetweenDates(branchId, standardFormat(initialDateStr),
					standardFormat(finalDateStr));
			if (purchases == null)
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

			return new ResponseEntity<List<Purchase>>(purchases, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}/purchases/today")
	public ResponseEntity<List<Purchase>> getByDate(@PathVariable("id") Long branchId) {
		try {
			List<Purchase> purchases = purchaseService.getTodayBranchPurchases(branchId);
			if (purchases == null)
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

			return new ResponseEntity<List<Purchase>>(purchases, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}/purchases/{id_purchase}")
	public ResponseEntity<Purchase> getOne(@PathVariable("id_purchase") Long purchaseId) {
		try {
			Purchase foundPurchase = purchaseService.getOnePurchase(purchaseId);
			if (foundPurchase == null)
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

			return new ResponseEntity<Purchase>(foundPurchase, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/{id}/purchases")
	public ResponseEntity<MessageDTO> saveOne(@Valid AddPurchaseDTO purchaseDTO, @PathVariable("id") Long branchId,
			BindingResult result) {
		try {
			if (result.hasErrors()) {
				new ResponseEntity<MessageDTO>(
						new MessageDTO("No se pudo guardar la compra" + result.getAllErrors().toString()),
						HttpStatus.BAD_REQUEST);
			}

			purchaseService.save(branchId, purchaseDTO);
			return new ResponseEntity<MessageDTO>(new MessageDTO("Compra guardada con éxito."), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<MessageDTO>(new MessageDTO("Error interno."), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{id}/purchases/{id_purchase}")
	public ResponseEntity<MessageDTO> deleteOne(@PathVariable("id_purchase") Long purchaseId) {
		try {
			purchaseService.delete(purchaseId);
			return new ResponseEntity<MessageDTO>(new MessageDTO("Compra eliminada."), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<MessageDTO>(new MessageDTO("Error interno."), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}/purchases/{id_purchase}")
	public ResponseEntity<MessageDTO> updateOne(@Valid AddPurchaseDTO purchaseDTO,
			@PathVariable("id_purchase") Long purchaseId, BindingResult result) {
		try {
			if (result.hasErrors()) {
				return new ResponseEntity<MessageDTO>(
						new MessageDTO("No se pudo modificar la compra." + result.getAllErrors().toString()),
						HttpStatus.BAD_REQUEST);
			}

			if (purchaseService.update(purchaseId, purchaseDTO))
				return new ResponseEntity<MessageDTO>(new MessageDTO("Compra actualizada."), HttpStatus.OK);

			return new ResponseEntity<MessageDTO>(
					new MessageDTO("No se pudo modificar la compra." + result.getAllErrors().toString()),
					HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<MessageDTO>(new MessageDTO("Error interno."), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
