package com.npupas.api.services;

import com.npupas.api.models.dtos.*;

import java.util.Date;
import java.util.List;

/**
 * Interface for the StatsService, providing methods to retrieve statistical data.
 */
public interface StatsService {

    /**
     * Retrieves the daily sale statistics for a specific branch.
     *
     * @param branchId the ID of the branch
     * @return a list of DailyStatDTO objects representing the daily sale statistics
     */
    List<DailyStatDTO> getTodaySaleStatsByBranchId(Long branchId);

    /**
     * Retrieves the daily sale statistics for a specific branch and date.
     *
     * @param branchId the ID of the branch
     * @param date the specific date
     * @return a list of DailyStatDTO objects representing the daily sale statistics
     */
    List<DailyStatDTO> getDailySaleStatsByBranchId(Long branchId, Date date);

    /**
     * Retrieves the daily purchase statistics for a specific branch.
     *
     * @param branchId the ID of the branch
     * @return a list of DailyStatDTO objects representing the daily purchase statistics
     */
    List<DailyStatDTO> getTodayPurchasesStatsByBranchId(Long branchId);

    /**
     * Retrieves the daily purchase statistics for a specific branch and date.
     *
     * @param branchId the ID of the branch
     * @param date the specific date
     * @return a list of DailyStatDTO objects representing the daily purchase statistics
     */
    List<DailyStatDTO> getDailyPurchasesStatsByBranchId(Long branchId, Date date);

    /**
     * Retrieves the sales statistics within a given date range for a specific branch.
     *
     * @param branchId the ID of the branch
     * @param requestDTO the request object containing the date range
     * @return a list of RangeStatDTO objects representing the sales statistics within the date range
     */
    List<RangeStatDTO> getRangeSalesStatsByBranchId(Long branchId, StatRequestDTO requestDTO);

    /**
     * Retrieves the purchase statistics within a given date range for a specific branch.
     *
     * @param branchId the ID of the branch
     * @param dto the request object containing the date range
     * @return a list of RangeStatDTO objects representing the purchase statistics within the date range
     */
    List<RangeStatDTO> getRangePurchasesStatsByBranchId(Long branchId, StatRequestDTO dto);

    /**
     * Retrieves the monthly sales statistics for multiple branches.
     *
     * @param token the token representing multiple branches
     * @return a list of PairStatDTO objects representing the monthly sales statistics for multiple branches
     */
    List<PairStatDTO> getBranchesMonthSalesStats(String token);

    /**
     * Retrieves the monthly sales statistics by category for multiple branches.
     *
     * @param token the token representing multiple branches
     * @return a list of PairStatDTO objects representing the monthly sales statistics by category for multiple branches
     */
    List<PairStatDTO> getBranchesMonthCategorySalesStats(String token);

    /**
     * Retrieves the line chart statistics for a specific branch, representing monthly data.
     *
     * @param branchId the ID of the branch
     * @return a LineChartGroupDTO object representing the line chart statistics for the specific branch
     */
    LineChartGroupDTO getLinechartMonthStats(Long branchId);

      /**
     * Retrieves the sales branches statistics for a specific admin, representing monthly data.
     *
     * @param adminId the ID of the admin
     * @return a SalesBranchesDTO object representing the sales branches statistics for the specific branch
     */
    SalesBranchesDTO getSalesChartsBranches(Long adminId);
}
