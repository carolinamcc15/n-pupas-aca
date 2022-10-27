package com.npupas.api.services.implementations;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.npupas.api.models.dtos.RegistrationFormDTO;
import com.npupas.api.models.entities.Admin;
import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Pupuseria;
import com.npupas.api.models.entities.Token;
import com.npupas.api.models.entities.User;
import com.npupas.api.repositories.AdminRepository;
import com.npupas.api.repositories.BranchRepository;
import com.npupas.api.repositories.PupuseriaRepository;
import com.npupas.api.repositories.TokenRepository;
import com.npupas.api.repositories.UserRepository;
import com.npupas.api.services.UserService;
import com.npupas.api.utils.TokenManager;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	PupuseriaRepository pupuseriaRepository;
	
	@Autowired
	AdminRepository adminRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired 
	private TokenRepository tokenRepository;
	
	@Autowired
	private BranchRepository branchRepository;
	
	@Autowired
	private TokenManager tokenManager;
	
	@Autowired
	private PasswordEncoder passEncoder;
	
	
	

	@Override
	public User getUser(Long id) {
		User foundUser = userRepository.findById(id).orElse(null);
		return foundUser;
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepository.findOneByUsername(username);
	}
	
	@Transactional(rollbackOn = Exception.class)
	private void cleanTokens(User user) {
	    List<Token> tokens = tokenRepository.findByUserAndActive(user, true);
	    
	    tokens.forEach((userToken) -> {
	        if(tokenManager.validateJwtToken(userToken.getContent(), user.getUsername())) {
	            userToken.setActive(false);
	            tokenRepository.save(userToken);
	        }
	    });
	    
	    if(tokens.size() > 0) {    	
	    Token lastOne = tokens.get(tokens.size() -1);
	    lastOne.setActive(true);
	    tokenRepository.save(lastOne);
	    }
	}
	
	@Override
	@Transactional(rollbackOn = Exception.class)
	public Boolean isTokenValid(User user, String token) throws Exception {
	    cleanTokens(user);
	    
	    List<Token> tokens = tokenRepository.findByUserAndActive(user, true);
	            
	    return tokens.stream()
	    .filter((userToken) -> {
	        return userToken.getContent().equals(token) && userToken.getActive();
	    })
	    .findAny()
	    .orElse(null) != null;
	}
	
	@Override
	@Transactional(rollbackOn = Exception.class)
	public void insertToken(User user, String token) throws Exception {
		cleanTokens(user);
		
		Token newToken = new Token(token, user);
		tokenRepository.save(newToken);
	}
	
	@Override
	public Boolean comparePassword(User user, String passToCompare) throws Exception {
		return passEncoder.matches(passToCompare, user.getPassword());
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void register(RegistrationFormDTO userInfo) throws Exception {
		User user = new User();
		Admin admin = new Admin();
		Pupuseria pupuseria = new Pupuseria();
		Branch branch = new Branch();
		
		branch.setAddress(userInfo.getAddress());
		branch.setName(userInfo.getNameBranch());
		branch.setOpeningDate(userInfo.getOpeningDate());
		branch.setPupuseria(pupuseria);
		
		String encPassword = passEncoder.encode(userInfo.getPassword());
		
		
		user.setName(userInfo.getName());
		user.setUsername(userInfo.getUsername());
		user.setPassword(encPassword);
		
		admin.setDUI(userInfo.getDUI());
		admin.setNIT(userInfo.getNIT());
		admin.setPhoneNumber(userInfo.getPhoneNumber());
		
		user.setAdmin(admin);
		admin.setUser(user);
		
		admin.setPupuseria(pupuseria);
		pupuseria.setAdmin(admin);
		pupuseria.setName(userInfo.getNamePupuseria());
		System.out.println("Se llega");
		
		
		pupuseriaRepository.save(pupuseria);
		branchRepository.save(branch);
		adminRepository.save(admin);
		userRepository.save(user);
	}
}
