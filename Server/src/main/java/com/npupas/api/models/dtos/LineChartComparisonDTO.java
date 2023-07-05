package com.npupas.api.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LineChartComparisonDTO {
    private LineChartStatDTO past;
    private LineChartStatDTO present;
}
