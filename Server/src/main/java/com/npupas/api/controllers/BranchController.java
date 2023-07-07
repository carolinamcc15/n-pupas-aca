package com.npupas.api.controllers;

import java.util.List;

import javax.validation.Valid;

import com.npupas.api.models.dtos.BranchDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.npupas.api.models.dtos.AddBranchDTO;
import com.npupas.api.models.dtos.MessageDTO;
import com.npupas.api.models.entities.Admin;
import com.npupas.api.models.entities.Branch;
import com.npupas.api.services.AdminService;
import com.npupas.api.services.BranchService;

@RestController
@RequestMapping("/pupuserias/branches")
public class BranchController {
	@Autowired
	BranchService branchService;

	@Autowired
	AdminService adminService;

	@GetMapping("/me")
	private ResponseEntity<List<BranchDTO>> getBranch(@RequestHeader("Authorization") String token) {
		try {
			Admin adminUser = adminService.getAdminByToken(token.substring(7));

			if (adminUser == null) {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			}

			List<BranchDTO> branches = branchService.getAllBranches(adminUser.getPupuseria().getID()).stream()
					.map(BranchDTO::new).toList();
			return new ResponseEntity<>(branches, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/competence")
	private ResponseEntity<List<BranchDTO>> getCompetenceBranchesData(@RequestHeader("Authorization") String token) {
		try {
			return new ResponseEntity<>(branchService.getCompetenceBranches(token), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}


	@GetMapping("/{id}")
	private ResponseEntity<BranchDTO> getOneBranch(@RequestHeader("Authorization") String token,
			@PathVariable("id") Long id) {
		try {
			Admin adminUser = adminService.getAdminByToken(token.substring(7));
			BranchDTO branch = new BranchDTO(branchService.getOneBranch(id));

			if (adminUser == null) {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			} else if (branch == null) {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}

			return new ResponseEntity<BranchDTO>(branch, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/")
	private ResponseEntity<MessageDTO> saveBranch(@RequestHeader("Authorization") String token,
			@Valid AddBranchDTO branchDTO, BindingResult result) {
		try {
			Admin adminUser = adminService.getAdminByToken(token.substring(7));

			if (result.hasErrors()) {
				String errors = result.getAllErrors().toString();
				return new ResponseEntity<>(new MessageDTO("Hay errores: " + errors), HttpStatus.BAD_REQUEST);
			} else if (adminUser == null) {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			}

			branchService.createBranch(adminUser.getPupuseria().getID(), branchDTO);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{id}")
	private ResponseEntity<MessageDTO> deleteBranch(@RequestHeader("Authorization") String token,
			@PathVariable("id") Long branchId) {
		try {
			Admin adminUser = adminService.getAdminByToken(token.substring(7));
			Branch branchToDelete = branchService.getOneBranch(branchId);

			if (branchToDelete == null) {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			} else if (adminUser == null) {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			}

			branchService.delete(branchId);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}")
	private ResponseEntity<MessageDTO> updateBranch(@RequestHeader("Authorization") String token,
			@Valid AddBranchDTO branchDTO,
			@PathVariable("id") Long branchId, BindingResult result) {
		try {
			Admin adminUser = adminService.getAdminByToken(token.substring(7));
			Branch branchToUpdate = branchService.getOneBranch(branchId);

			if (result.hasErrors()) {
				System.out.println(result);
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			} else if (branchToUpdate == null) {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			} else if (adminUser == null) {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			}

			branchService.update(branchToUpdate, branchDTO);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
