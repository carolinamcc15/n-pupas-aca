package com.npupas.api.models.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class StatRequestDTO {
    private Date from;
    private Date to;
}
