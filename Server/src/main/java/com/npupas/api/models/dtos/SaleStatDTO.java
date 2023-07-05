package com.npupas.api.models.dtos;

import com.npupas.api.projections.ChartStats;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class SaleStatDTO {
    private Long saleId;
    private Date saleDate;
    private Double saleTotal;

    public SaleStatDTO(ChartStats stat){
        saleId = stat.getTransactionId();
        saleDate = stat.getDate();
        saleTotal = stat.getTotal();
    }
}
