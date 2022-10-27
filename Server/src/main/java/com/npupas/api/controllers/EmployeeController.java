package com.npupas.api.controllers;

import java.util.List;

import javax.validation.Valid;

import com.npupas.api.models.dtos.AddEmployeeDTO;
import com.npupas.api.models.dtos.MessageDTO;
import com.npupas.api.models.entities.Admin;
import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Employee;
import com.npupas.api.services.AdminService;
import com.npupas.api.services.EmployeeService;

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

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "https://n-pupas.vercel.app" }, allowCredentials = "true")
@RequestMapping("/pupuserias/branches")
public class EmployeeController {
	@Autowired
	EmployeeService employeeService;
	@Autowired
	AdminService adminService;

	@GetMapping("/{id}/employees")
	public ResponseEntity<List<Employee>> getAllEmployees(@PathVariable("id") Long id) {
		try {
			List<Employee> employees = employeeService.getBranchEmployees(id);
			if (employees == null) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			} else {
				return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}/employees/{id_employee}")
	public ResponseEntity<Employee> getOneEmployee(@PathVariable("id") Long branchId,
			@PathVariable("id_employee") Long employeeId) {
		try {
			Employee employee = employeeService.getOneEmployee(branchId, employeeId);
			return new ResponseEntity<Employee>(employee, HttpStatus.OK);
		} catch (IndexOutOfBoundsException e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/employees/me")
	public ResponseEntity<Employee> getMyInformation(@RequestHeader("Authorization") String token) {
		try {
			Employee employee = employeeService.getEmployeeByToken(token.substring(7));
			if (employee == null) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			} else
				return new ResponseEntity<Employee>(employee, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/employees/branch")
	public ResponseEntity<Branch> getEmployeeBranchInfo(@RequestHeader("Authorization") String token) {
		try {
			Employee employee = employeeService.getEmployeeByToken(token.substring(7));
			if (employee == null) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			} else
				return new ResponseEntity<Branch>(employee.getBranch(), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/{id}/employees")
	public ResponseEntity<MessageDTO> saveEmployee(@Valid AddEmployeeDTO employeeDTO, @PathVariable("id") Long branchId,
			BindingResult result, @RequestHeader("Authorization") String token) {
		try {
			Admin admin = adminService.getAdminByToken(token.substring(7));
			if (admin == null) {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			} else {
				if (result.hasErrors())
					return new ResponseEntity<MessageDTO>(
							new MessageDTO(
									"Se encontraron errores en los datos: \n" + result.getAllErrors().toString()),
							HttpStatus.BAD_REQUEST);
				else if (admin.getPupuseria().getBranches().stream().filter(b -> b.getID() == branchId).toList()
						.size() > 0) {
					employeeService.createEmployee(branchId, employeeDTO);
					return new ResponseEntity<MessageDTO>(new MessageDTO("Empleado creado con exito."),
							HttpStatus.CREATED);
				} else
					return new ResponseEntity<MessageDTO>(new MessageDTO("La branch no pertenece al administrador"),
							HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<MessageDTO>(new MessageDTO("Hubo un error interno."),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/{id}/employees/{user_id}")
	public ResponseEntity<MessageDTO> payTaxes(@PathVariable("id") Long branchId, @PathVariable("user_id") Long userId,
			@RequestHeader("Authorization") String token) {
		try {
			Admin admin = adminService.getAdminByToken(token.substring(7));
			if (admin == null) {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			} else {
				if (admin.getPupuseria().getBranches().stream().filter(b -> b.getID() == branchId).toList()
						.size() > 0) {
					employeeService.payTaxes(branchId, userId);
					return new ResponseEntity<MessageDTO>(new MessageDTO("Impuestos pagados con éxito"),
							HttpStatus.CREATED);
				} else
					return new ResponseEntity<MessageDTO>(new MessageDTO("La branch no pertenece al administrador"),
							HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<MessageDTO>(new MessageDTO("Hubo un error interno."),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}/employees/{id_employee}")
	public ResponseEntity<MessageDTO> updateEmployee(@Valid AddEmployeeDTO employeeDTO,
			@PathVariable("id") Long branchId, @PathVariable("id_employee") Long employeeId, BindingResult result,
			@RequestHeader("Authorization") String token) {
		try {
			Admin admin = adminService.getAdminByToken(token.substring(7));
			if (admin == null) {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			} else {
				if (result.hasErrors())
					return new ResponseEntity<MessageDTO>(
							new MessageDTO(
									"Se encontraron errores en los datos: \n" + result.getAllErrors().toString()),
							HttpStatus.BAD_REQUEST);

				else if (admin.getPupuseria().getBranches().stream().filter(b -> b.getID() == branchId).toList()
						.size() > 0) {
					employeeService.updateEmployee(employeeDTO, employeeId);
					return new ResponseEntity<MessageDTO>(new MessageDTO("Empleado modificado con exito."),
							HttpStatus.OK);
				} else
					return new ResponseEntity<MessageDTO>(new MessageDTO("La branch no pertenece al administrador"),
							HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<MessageDTO>(new MessageDTO("Hubo un error interno."),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{id}/employees/{id_employee}")
	public ResponseEntity<MessageDTO> deleteEmployee(@PathVariable("id") Long branchId,
			@PathVariable("id_employee") Long employeeId) {
		try {
			if (employeeService.deleteEmployee(branchId, employeeId))
				return new ResponseEntity<MessageDTO>(new MessageDTO("El empleado ha sido borrado con éxito."),
						HttpStatus.OK);
			else
				return new ResponseEntity<MessageDTO>(
						new MessageDTO("El empleado no existe o no pertenece a la sucursal"), HttpStatus.ACCEPTED);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
