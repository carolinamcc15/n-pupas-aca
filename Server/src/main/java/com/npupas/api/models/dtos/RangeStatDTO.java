package com.npupas.api.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class RangeStatDTO {
    private Date date;
    private Double total;
}
