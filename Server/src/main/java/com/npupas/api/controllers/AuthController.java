	package com.npupas.api.controllers;

import javax.validation.Valid;

import com.npupas.api.models.dtos.*;
import com.npupas.api.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.npupas.api.models.entities.User;
import com.npupas.api.services.UserService;
import com.npupas.api.utils.TokenManager;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Value("${mail.email}")
	private String email;

	@Value("${mail.subject}")
	private String subject;

	@Value("${mail.sign}")
	private String sign;

	@Value("${mail.location}")
	private String location;

	@Autowired
	UserService userService;
	@Autowired
	TokenManager tokenManager;
	@Autowired
	private EmailService emailService;

	@PostMapping("/login")
	private ResponseEntity<TokenDTO> login(@Valid LoginDTO loginInfo, BindingResult result) {
	    try {

	        if(result.hasErrors()) {
	            return new ResponseEntity<>(
	                    new TokenDTO(),
	                    HttpStatus.BAD_REQUEST
	                );
	        }

	        User user = userService.getUserByUsername(loginInfo.getUsername());

	        if(!userService.comparePassword(user, loginInfo.getPassword())) {
	            return new ResponseEntity<>(
	                    new TokenDTO(),
	                    HttpStatus.UNAUTHORIZED
	                );
	        }
	        
	        final String token = tokenManager.generateJwtToken(user.getUsername());
	        
	        userService.insertToken(user, token); 
	        String role = user.getAdmin() == null ? "Employee": "Admin";
	        
	        return new ResponseEntity<>(
	                    new TokenDTO(token, role),
	                    HttpStatus.CREATED
	                );
	        
	    } catch (Exception e) {
	        System.out.println(e.getMessage());
	        return new ResponseEntity<>(
	                new TokenDTO(),
	                HttpStatus.INTERNAL_SERVER_ERROR
	            );
	    }
	}

	@PostMapping("/sign-up")
	private ResponseEntity<MessageDTO> registerAdmin(@Valid RegistrationFormDTO formDTO, BindingResult result) {
		try {
			if (result.hasErrors()) {
				String errors = result.getAllErrors().toString();
				return new ResponseEntity<>(new MessageDTO("Hay errores: " + errors), HttpStatus.BAD_REQUEST);
			}

			User foundUser = userService.getUserByUsername(formDTO.getUsername());

			if (foundUser != null) {
				return new ResponseEntity<>(new MessageDTO("El nombre de usuario ya existe"),
						HttpStatus.BAD_REQUEST);
			}

			userService.register(formDTO);
			MailMessageDTO mailMessage = new MailMessageDTO();
			mailMessage.setMailTo(formDTO.getUsername());
			mailMessage.setSubject(subject);
			mailMessage.setFrom(email);
			Map<String, Object> model = new HashMap<String, Object>();
			model.put("name", formDTO.getName());
			model.put("location", location);
			model.put("sign", sign);
			mailMessage.setProps(model);
			emailService.sendWelcomeEmail(mailMessage);

			return new ResponseEntity<>(new MessageDTO("Usuario registrado exitosamente"), HttpStatus.CREATED);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(new MessageDTO("Error interno del servidor"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
