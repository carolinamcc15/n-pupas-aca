package com.npupas.api.models.dtos;

import com.npupas.api.projections.PairStat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class SalesBranchesDTO {
    private double saleTotal;
    private double saleAverageByDay;
    private double saleAverageByMonth;
    private List<Map<String, Double>> salesBranches;

    public SalesBranchesDTO(List<PairStat> chart) {
        this.salesBranches = chart.stream()
                .map(branch -> {
                    Map<String, Double> branchMap = new HashMap<>();
                    branchMap.put(branch.getTitle(), branch.getTotal());
                    return branchMap;
                })
                .collect(Collectors.toList());
    }

    public void calculateSalesStatistics() {

        double totalSales = salesBranches.stream()
                .flatMap(map -> map.values().stream())
                .mapToDouble(Double::doubleValue)
                .sum();
        int numBranches = salesBranches.size();

        saleTotal = totalSales;
        saleAverageByDay = totalSales / (numBranches * 30);
        saleAverageByMonth = totalSales / numBranches;

    }

    public List<Map<String, Double>> getSalesBranches() {
        return salesBranches;
    }
}
