package com.npupas.api.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LineChartGroupDTO {
    private LineChartComparisonDTO sales;
    private LineChartComparisonDTO purchases;
    private LineChartComparisonDTO revenue;
}
