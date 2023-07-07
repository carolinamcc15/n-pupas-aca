package com.npupas.api.services;

import com.npupas.api.models.dtos.*;

import java.util.Date;
import java.util.List;

public interface StatsService {
    List<DailyStatDTO> getTodaySaleStatsByBranchId(Long branchId);
    List<DailyStatDTO> getDailySaleStatsByBranchId(Long branchId, Date date);
    List<DailyStatDTO> getTodayPurchasesStatsByBranchId(Long branchId);
    List<DailyStatDTO> getDailyPurchasesStatsByBranchId(Long branchId, Date date);
    List<RangeStatDTO> getRangeSalesStatsByBranchId(Long branchId, StatRequestDTO requestDTO);
    List<RangeStatDTO> getRangePurchasesStatsByBranchId(Long branchId, StatRequestDTO dto);
    List<PairStatDTO> getBranchesMonthSalesStats(String token);
    List<PairStatDTO> getBranchesMonthCategorySalesStats(String token);
    LineChartGroupDTO getLinechartMonthStats(Long branchId);
    SalesBranchesDTO getSalesChartsBranches(Long adminId);
}
