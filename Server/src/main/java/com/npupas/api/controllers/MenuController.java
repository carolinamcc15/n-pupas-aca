package com.npupas.api.controllers;

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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.npupas.api.models.dtos.AddProductDTO;
import com.npupas.api.models.dtos.MessageDTO;
import com.npupas.api.models.entities.Admin;
import com.npupas.api.models.entities.Product;
import com.npupas.api.models.entities.ProductType;
import com.npupas.api.services.AdminService;
import com.npupas.api.services.MenuService;
import com.npupas.api.services.ProductTypeService;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "https://n-pupas.vercel.app" }, allowCredentials = "true")
@RequestMapping("/pupuserias")
public class MenuController {

	@Autowired
	MenuService menuService;

	@Autowired
	AdminService adminService;

	@Autowired
	ProductTypeService productTypeService;

	@GetMapping("/menu")
	public ResponseEntity<List<Product>> getPupuseriaMenu(@RequestHeader("Authorization") String token) {
		try {
			Admin admin = adminService.getAdminByToken(token.substring(7));
			if (admin == null) {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			} else {
				List<Product> products = menuService.getAllProducts(admin.getPupuseria().getID());
				return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/menu")
	public ResponseEntity<MessageDTO> createProduct(@RequestHeader("Authorization") String token,
			@Valid AddProductDTO product, BindingResult result) {
		try {
			if (result.hasErrors()) {
				return new ResponseEntity<MessageDTO>(
						new MessageDTO("Datos de la petición son incorrectos. " + result.getAllErrors().toString()),
						HttpStatus.BAD_REQUEST);
			}

			if (menuService.createProduct(token, product))
				return new ResponseEntity<MessageDTO>(new MessageDTO("Producto creado con éxito."), HttpStatus.CREATED);

			return new ResponseEntity<MessageDTO>(new MessageDTO("Ocurrió un problema con la petición."),
					HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/menu/{id}")
	public ResponseEntity<Product> getPupuseriaMenuProduct(@PathVariable("id") Long id,
			@RequestHeader("Authorization") String tokenStr) {
		try {
			Product product = menuService.getOneProduct(tokenStr, id);
			if (product == null)
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			else
				return new ResponseEntity<Product>(product, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/menu/{product_id}")
	public ResponseEntity<MessageDTO> putPupuseriaMenuProduct(@RequestHeader("Authorization") String tokenStr,
			@PathVariable("product_id") Long productId, @Valid AddProductDTO productDTO, BindingResult result) {
		try {
			if (result.hasErrors()) {
				return new ResponseEntity<MessageDTO>(new MessageDTO("Datos de la petición son incorrectos."),
						HttpStatus.BAD_REQUEST);
			}

			if (menuService.updateProduct(tokenStr, productId, productDTO))
				return new ResponseEntity<MessageDTO>(new MessageDTO("Producto modificado con éxito."),
						HttpStatus.CREATED);

			return new ResponseEntity<MessageDTO>(new MessageDTO("Ocurrió un problema con la petición."),
					HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/menu/{product_id}")
	public ResponseEntity<MessageDTO> deletePupuseriaMenuProduct(@RequestHeader("Authorization") String tokenStr,
			@PathVariable("product_id") Long productId) {
		try {
			if (menuService.deleteProduct(tokenStr, productId))
				return new ResponseEntity<MessageDTO>(new MessageDTO("Producto borrado con éxito."), HttpStatus.OK);
			else
				return new ResponseEntity<MessageDTO>(new MessageDTO("Petición mal realizada."),
						HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<MessageDTO>(new MessageDTO("Error en servidor."),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/products/types")
	public ResponseEntity<List<ProductType>> getProductTypes() {
		try {
			List<ProductType> productTypes = productTypeService.getAllProductTypes();
			return new ResponseEntity<List<ProductType>>(productTypes, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
