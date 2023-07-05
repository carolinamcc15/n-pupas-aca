package com.npupas.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.npupas.api.models.entities.Admin;
import com.npupas.api.services.AdminService;

@RestController
@RequestMapping("/pupuserias")
public class AdminController {
    
    @Autowired
    AdminService adminService;

    @GetMapping("/admins/me")
    public ResponseEntity<Admin> getMyInformation(@RequestHeader("Authorization") String token) {
        try {
            Admin admin = adminService.getAdminByToken(token.substring(7));
            if (admin == null) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } else
                return new ResponseEntity<Admin>(admin, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
