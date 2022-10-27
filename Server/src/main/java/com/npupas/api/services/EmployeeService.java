package com.npupas.api.services;

import java.util.List;

import com.npupas.api.models.dtos.AddEmployeeDTO;
import com.npupas.api.models.entities.Employee;

public interface EmployeeService {

	List<Employee> getBranchEmployees(Long branchId);

	Employee getOneEmployee(Long idBranch ,Long idUser) throws IndexOutOfBoundsException;
	
	Boolean createEmployee(Long idBranch, AddEmployeeDTO dto);
	
	Boolean deleteEmployee(Long idBranch, Long idEmployee);

	void updateEmployee(AddEmployeeDTO dto, Long idEmployee);
	
	Employee getEmployeeByToken(String tokenStr);
	
	void payTaxes(Long branchId, Long userId);
}
