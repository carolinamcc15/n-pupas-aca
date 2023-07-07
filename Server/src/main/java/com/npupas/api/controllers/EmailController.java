package com.npupas.api.controllers;

import com.npupas.api.models.dtos.MailMessageDTO;
import com.npupas.api.models.dtos.SalesBranchesDTO;
import com.npupas.api.models.dtos.StatRequestDTO;
import com.npupas.api.models.entities.Pupuseria;
import org.springframework.beans.factory.annotation.Value;
import com.npupas.api.services.EmailService;
import com.npupas.api.services.PupuseriaService;
import com.npupas.api.services.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/email")
public class EmailController {

	@Autowired
	StatsService service;

	@Autowired
	private PupuseriaService pupuseriaService;

	@Autowired
	private EmailService emailService;

	@Value("${mail.email}")
	private String email;

	@GetMapping("/sales/branches/{adminId}")
	public ResponseEntity<SalesBranchesDTO> getBranchSalesStats(@PathVariable("adminId") Long adminId,
																@RequestHeader("Authorization") String tokenStr) {

		SalesBranchesDTO salesChartsDTO = service.getSalesChartsBranches(adminId);

		if (salesChartsDTO == null) {
			return ResponseEntity.noContent().build();
		}

		salesChartsDTO.calculateSalesStatistics();

		Pupuseria pupuseria = pupuseriaService.getPupuseria(tokenStr.substring(7));
		if(pupuseria == null) return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);


		String ownerEmail = pupuseria.getAdmin().getUser().getUsername();

		MailMessageDTO mail = new MailMessageDTO();
		mail.setMailTo(ownerEmail);
		mail.setSubject("Informe de Ventas en Sucursales");
		mail.setFrom(email);

		try {
			emailService.sendSalesBranchesEmail(mail, pupuseria.getName(), salesChartsDTO);
			return ResponseEntity.ok(salesChartsDTO);
		} catch (Exception e) {
			System.out.println("Error al enviar el correo electrónico: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
}