package com.npupas.api.services;

import com.npupas.api.models.entities.Admin;

public interface AdminService {
    Admin getAdminByToken(String tokenContent);
}
