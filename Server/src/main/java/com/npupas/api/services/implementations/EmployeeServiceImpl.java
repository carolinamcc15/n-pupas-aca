package com.npupas.api.services.implementations;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.npupas.api.models.dtos.AddEmployeeDTO;
import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Employee;
import com.npupas.api.models.entities.Token;
import com.npupas.api.models.entities.User;
import com.npupas.api.repositories.BranchRepository;
import com.npupas.api.repositories.EmployeeRepository;
import com.npupas.api.repositories.TokenRepository;
import com.npupas.api.repositories.UserRepository;
import com.npupas.api.services.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	BranchRepository branchRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TokenRepository tokenRepository;
	
	@Autowired
	private PasswordEncoder passEncoder;
	
	@Override
	public List<Employee> getBranchEmployees(Long branchId) {
		Branch branch = branchRepository.findById(branchId).orElse(null);
		if(branch == null)
			return null;
		
		List<Employee> foundBranchEmployee = employeeRepository.findByBranch(branch);

		return foundBranchEmployee;
	}

	@Override
	public Employee getOneEmployee(Long idBranch , Long idUser) throws IndexOutOfBoundsException {
		Branch branch = branchRepository.findById(idBranch).orElse(null);
		
		if(branch == null)
			return null;
		
		Employee foundEmployee = branch.getEmployees().stream().filter(b -> b.getID() == idUser).toList().get(0);
		
		return foundEmployee;
	}

	@Override
	public Boolean createEmployee(Long idBranch, AddEmployeeDTO dto) {
		Employee employee = new Employee();
		employee.setAfp(new BigDecimal("0.00"));
		employee.setIsss(new BigDecimal("0.00"));
		employee.setRent(new BigDecimal("0.00"));
		employee.setHiringDate(dto.getHiringDate());
		employee.setSalary(dto.getSalary());
		
		
		User user = new User();
		user.setName(dto.getName());
		user.setPassword(passEncoder.encode(dto.getPassword()));
		user.setUsername(dto.getUserName());
		
		userRepository.save(user);
		
		Branch branch = branchRepository.findById(idBranch).orElse(null);
		employee.setBranch(branch);
		employee.setUser(user);
		
		
		employeeRepository.save(employee);
		
		
		return true;
	}

	@Override
	public Boolean deleteEmployee(Long idBranch, Long idEmployee) {
		Branch branch = branchRepository.findById(idBranch).orElse(null);
		if(branch == null) return false;
		
		
		if(branch.getEmployees().stream().filter(e -> e.getID() == idEmployee).toList().size() <= 0) return false;
		
		Employee employee = branch.getEmployees().stream().filter(e -> e.getID() == idEmployee).toList().get(0);
		
		
		employeeRepository.delete(employee);
		return true;
	}

	@Override
	public void updateEmployee(AddEmployeeDTO dto, Long idEmployee) {
		Employee employee = employeeRepository.findById(idEmployee).orElse(null);
		employee.setHiringDate(dto.getHiringDate());
		employee.getUser().setName(dto.getName());
		employee.getUser().setUsername(dto.getUserName());
		employee.setSalary(dto.getSalary());
		employee.getUser().setPassword(passEncoder.encode(dto.getPassword()));
		
		userRepository.save(employee.getUser());
		employeeRepository.save(employee);
	}

	@Override
	public Employee getEmployeeByToken(String tokenStr) {
		Token token = tokenRepository.findByContent(tokenStr);
        return token.getUser().getEmployee();
	}

	@Override
	public void payTaxes(Long branchId, Long userId) {
		Branch branch = branchRepository.findById(branchId).orElse(null);
		Employee employee = branch.getEmployees().stream().filter(e -> e.getID() == userId).toList().get(0);
		
		BigDecimal newIsss = employee.getIsss().add( employee.getSalary().multiply(new BigDecimal("0.03")) );
		BigDecimal newRent = employee.getRent().add( employee.getSalary().multiply(new BigDecimal("0.10")) );
		BigDecimal newAfp = employee.getAfp().add( employee.getSalary().multiply(new BigDecimal("0.07")) );
		
		employee.setIsss(newIsss);
		employee.setRent(newRent);
		employee.setAfp(newAfp);
		
		employeeRepository.save(employee);
	}

}
