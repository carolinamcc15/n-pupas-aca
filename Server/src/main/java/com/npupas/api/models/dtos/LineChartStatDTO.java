package com.npupas.api.models.dtos;

import com.npupas.api.projections.LineChartStat;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LineChartStatDTO {
    private Double totalSales;
    private Integer salesQuantity;

    public LineChartStatDTO(LineChartStat stat){
        this.totalSales = stat.getTotalSales();
        this.salesQuantity = stat.getSalesQuantity();
    }
}
