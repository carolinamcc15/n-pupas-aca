package com.npupas.api.repositories;

import com.npupas.api.models.entities.Sale;
import com.npupas.api.projections.ChartStats;
import com.npupas.api.projections.LineChartStat;
import com.npupas.api.projections.PairStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

/**
 * Repository interface for statistics, providing methods to retrieve various statistical data.
 */
public interface StatsRepository extends JpaRepository<Sale, Long> {

    /**
     * Retrieves the daily sale statistics for a specific branch and date.
     *
     * @param branchId the ID of the branch
     * @param date the specific date
     * @return a list of ChartStats objects representing the daily sale statistics
     */
    @Query(value = "SELECT s.id AS transactionId, s.sale_date AS date, SUM(sd.total) AS total " +
        "FROM sale s " +
        "INNER JOIN sales_detail sd ON sd.id_sale = s.id " +
        "WHERE s.id_branch = :branchId AND DATE(s.sale_date) = DATE(:date) " +
        "GROUP BY s.id", nativeQuery = true)
    List<ChartStats> getDailySaleStats(@Param("branchId") Long branchId, @Param("date") Date date);

    /**
     * Retrieves the sales statistics within a given date range for a specific branch.
     *
     * @param branchId the ID of the branch
     * @param from the start date of the range
     * @param to the end date of the range
     * @return a list of ChartStats objects representing the sales statistics within the date range
     */
    @Query(value = "SELECT s.id AS transactionId, s.sale_date AS date, SUM(sd.total) AS total " +
        "FROM sale s " +
        "INNER JOIN sales_detail sd ON sd.id_sale = s.id " +
        "WHERE s.id_branch = :branchId AND s.sale_date BETWEEN :from AND :to " +
        "GROUP BY s.id", nativeQuery = true)
    List<ChartStats> getRangeSalesStats(@Param("branchId") Long branchId, @Param("from") Date from, @Param("to") Date to);

    /**
     * Retrieves the daily purchase statistics for a specific branch and date.
     *
     * @param branchId the ID of the branch
     * @param date the specific date
     * @return a list of ChartStats objects representing the daily purchase statistics
     */
    @Query(value = "SELECT p.id AS transactionId, p.purchase_date AS date, p.amount AS total " +
        "FROM purchase p " +
        "WHERE p.id_branch = :branchId AND DATE(p.purchase_date) = DATE(:date)", nativeQuery = true)
    List<ChartStats> getDailyPurchasesStats(@Param("branchId") Long branchId, @Param("date") Date date);

    /**
     * Retrieves the purchase statistics within a given date range for a specific branch.
     *
     * @param branchId the ID of the branch
     * @param from the start date of the range
     * @param to the end date of the range
     * @return a list of ChartStats objects representing the purchase statistics within the date range
     */
    @Query(value = "SELECT p.id AS transactionId, p.purchase_date AS date, p.amount AS total " +
        "FROM purchase p " +
        "WHERE p.id_branch = :branchId AND p.purchase_date BETWEEN :from AND :to", nativeQuery = true)
    List<ChartStats> getRangePurchasesStats(@Param("branchId") Long branchId, @Param("from") Date from, @Param("to") Date to);

    /**
     * Retrieves the monthly sales statistics for multiple branches.
     *
     * @param adminId the ID of the admin
     * @return a list of PairStat objects representing the monthly sales statistics for multiple branches
     */
    @Query(value = "SELECT b.name AS title, SUM(sd.total) AS total " +
        "FROM sale s " +
        "INNER JOIN sales_detail sd ON sd.id_sale = s.id " +
        "INNER JOIN branch b ON b.id = s.id_branch " +
        "INNER JOIN pupuseria p ON p.id = b.id_pupuseria " +
        "INNER JOIN admin a ON a.id = p.id_admin " +
        "WHERE s.sale_date >= DATE_TRUNC('month', CURRENT_DATE) AND a.id = :adminId " +
        "GROUP BY b.id", nativeQuery = true)
    List<PairStat> getBranchesMonthSalesStats(@Param("adminId") Long adminId);

    /**
     * Retrieves the monthly sales statistics by category for multiple branches.
     *
     * @param adminId the ID of the admin
     * @return a list of PairStat objects representing the monthly sales statistics by category for multiple branches
     */
    @Query(value = "SELECT t.type AS title, SUM(sd.total) AS total " +
        "FROM sale s " +
        "INNER JOIN sales_detail sd ON sd.id_sale = s.id " +
        "INNER JOIN product pr ON pr.id = sd.id_product " +
        "INNER JOIN type t ON t.id = pr.id_type " +
        "INNER JOIN branch b ON b.id = s.id_branch " +
        "INNER JOIN pupuseria p ON p.id = b.id_pupuseria " +
        "INNER JOIN admin a ON a.id = p.id_admin " +
        "WHERE s.sale_date >= DATE_TRUNC('month', CURRENT_DATE) AND a.id = :adminId " +
        "GROUP BY t.id", nativeQuery = true)
    List<PairStat> getBranchesMonthCategorySalesStats(@Param("adminId") Long adminId);

    /**
     * Retrieves the line chart statistics for sales in the current month for a specific branch.
     *
     * @param branchId the ID of the branch
     * @return a LineChartStat object representing the line chart statistics for sales in the current month
     */
    @Query(value = "SELECT COUNT(s.id) AS salesQuantity, SUM(sd.total) AS totalSales " +
        "FROM sale s " +
        "INNER JOIN sales_detail sd ON sd.id_sale = s.id " +
        "INNER JOIN branch b ON b.id = s.id_branch " +
        "WHERE s.sale_date >= DATE(DATE_TRUNC('month', CURRENT_DATE)) AND b.id = :branchId", nativeQuery = true)
    LineChartStat getThisMonthSalesLinechartStats(@Param("branchId") Long branchId);

    /**
     * Retrieves the line chart statistics for sales in the previous month for a specific branch.
     *
     * @param branchId the ID of the branch
     * @return a LineChartStat object representing the line chart statistics for sales in the previous month
     */
    @Query(value = "SELECT COUNT(s.id) AS salesQuantity, SUM(sd.total) AS totalSales " +
        "FROM sale s " +
        "INNER JOIN sales_detail sd ON sd.id_sale = s.id " +
        "INNER JOIN branch b ON b.id = s.id_branch " +
        "WHERE s.sale_date BETWEEN DATE(date_trunc('month', CURRENT_DATE - interval '1 month')) AND DATE(DATE_TRUNC('month', CURRENT_DATE)) AND b.id = :branchId", nativeQuery = true)
    LineChartStat getLastMonthSalesLinechartStats(@Param("branchId") Long branchId);

    /**
     * Retrieves the line chart statistics for purchases in the current month for a specific branch.
     *
     * @param branchId the ID of the branch
     *@return a LineChartStat object representing the line chart statistics for purchases in the current month
     */
    @Query(value = "SELECT COUNT(p.id) AS salesQuantity, SUM(p.amount) AS totalSales " +
        "FROM purchase p " +
        "WHERE p.purchase_date >= DATE(DATE_TRUNC('month', CURRENT_DATE)) AND p.id_branch = :branchId", nativeQuery = true)
    LineChartStat getThisMonthPurchasesLinechartStats(@Param("branchId") Long branchId);

    /**
     * Retrieves the line chart statistics for purchases in the previous month for a specific branch.
     *
     * @param branchId the ID of the branch
     * @return a LineChartStat object representing the line chart statistics for purchases in the previous month
     */
    @Query(value = "SELECT COUNT(p.id) AS salesQuantity, SUM(p.amount) AS totalSales " +
        "FROM purchase p " +
        "WHERE p.purchase_date BETWEEN DATE(date_trunc('month', CURRENT_DATE - interval '1 month')) AND DATE(DATE_TRUNC('month', CURRENT_DATE)) AND p.id_branch = :branchId", nativeQuery = true)
    LineChartStat getLastMonthPurchasesLinechartStats(@Param("branchId") Long branchId);
}

