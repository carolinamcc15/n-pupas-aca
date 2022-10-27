package com.npupas.api.controllers;

import java.time.LocalDate;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.npupas.api.models.dtos.AddSaleDTO;
import com.npupas.api.models.dtos.MessageDTO;
import com.npupas.api.models.entities.Sale;
import com.npupas.api.services.SalesService;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "https://n-pupas.vercel.app" }, allowCredentials = "true")
@RequestMapping("/pupuserias/branches")
public class SaleController {

	@Autowired
	SalesService salesService;

	@GetMapping("/{id}/sales")
	private ResponseEntity<List<Sale>> getAllSales(@PathVariable("id") Long id) {
		try {
			List<Sale> sales = salesService.getAllSales(id);
			if (sales == null)
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

			return new ResponseEntity<List<Sale>>(sales, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}/sales/report")
	public ResponseEntity<List<Sale>> getBetweenDates(@PathVariable("id") Long branchId,
			@RequestParam("initialDate") String initialDate, @RequestParam("finalDate") String finalDate) {
		try {
			List<Sale> sales = salesService.getSalesBetweenDates(branchId, LocalDate.parse(initialDate),
					LocalDate.parse(finalDate));
			if (sales == null)
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

			return new ResponseEntity<List<Sale>>(sales, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/{id}/sales")
	private ResponseEntity<MessageDTO> createSale(@PathVariable("id") Long id, @Valid @RequestBody AddSaleDTO saleDTO,
			BindingResult result) {
		try {
			if (result.hasErrors()) {
				return new ResponseEntity<MessageDTO>(
						new MessageDTO("Existen errores en la petición: " + result.getAllErrors().toString()),
						HttpStatus.BAD_REQUEST);
			}

			Boolean created = salesService.createSale(id, saleDTO);
			if (created) {
				return new ResponseEntity<MessageDTO>(new MessageDTO("Venta registrada con éxito."),
						HttpStatus.CREATED);
			}

			return new ResponseEntity<MessageDTO>(
					new MessageDTO("La sucursal no pertenece a la pupusería o no existe."),
					HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}/sales/today")
	private ResponseEntity<List<Sale>> getAllSalesForToday(@PathVariable("id") Long id) {
		try {
			List<Sale> sales = salesService.getTodaySales(id);
			if (sales == null)
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

			return new ResponseEntity<List<Sale>>(sales, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}/sales/{sale_id}")
	private ResponseEntity<Sale> getSale(@PathVariable("id") Long id, @PathVariable("sale_id") Long saleId) {
		try {
			Sale sale = salesService.getSale(id, saleId);
			if (sale == null)
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

			return new ResponseEntity<Sale>(sale, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}/sales/{sale_id}")
	private ResponseEntity<MessageDTO> putSale(@PathVariable("id") Long id, @PathVariable("sale_id") Long saleId,
			@Valid @RequestBody AddSaleDTO saleDTO, BindingResult result) {
		try {
			if (result.hasErrors()) {
				return new ResponseEntity<MessageDTO>(
						new MessageDTO("Existen errores en la petición: " + result.getAllErrors().toString()),
						HttpStatus.BAD_REQUEST);
			}

			Boolean created = salesService.updateSale(id, saleDTO, saleId);

			if (created) {
				return new ResponseEntity<MessageDTO>(new MessageDTO("Venta modificada con éxito."),
						HttpStatus.CREATED);
			}

			return new ResponseEntity<MessageDTO>(
					new MessageDTO("La venta no existe o no pertenece a la sucursal. "),
					HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{id}/sales/{sale_id}")
	private ResponseEntity<MessageDTO> deleteSale(@PathVariable("id") Long id, @PathVariable("sale_id") Long saleId) {
		try {
			Boolean deleted = salesService.deleteSale(id, saleId);

			if (deleted)
				return new ResponseEntity<MessageDTO>(new MessageDTO("Venta borrada con éxito."), HttpStatus.OK);

			return new ResponseEntity<MessageDTO>(new MessageDTO("Petición mal realizada."), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<MessageDTO>(new MessageDTO("Error en servidor."),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
