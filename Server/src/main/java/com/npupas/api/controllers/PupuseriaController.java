package com.npupas.api.controllers;

import com.npupas.api.models.entities.Pupuseria;
import com.npupas.api.services.PupuseriaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "https://npupas.herokuapp.com" }, allowCredentials = "true")
@RequestMapping("/pupuserias")
public class PupuseriaController {
	
	@Autowired
	PupuseriaService pupuseriaService;
	
	@GetMapping("/me")
	public ResponseEntity<Pupuseria> getPupuseria(@RequestHeader("Authorization") String tokenStr) {
		try {
			Pupuseria pupuseria = pupuseriaService.getPupuseria(tokenStr.substring(7));
			if(pupuseria == null) return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			else return new ResponseEntity<Pupuseria>(pupuseria, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
