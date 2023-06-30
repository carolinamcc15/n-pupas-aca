package com.npupas.api.repositories;

import com.npupas.api.models.entities.Sale;
import com.npupas.api.projections.ChartStats;
import com.npupas.api.projections.LineChartStat;
import com.npupas.api.projections.PairStat;
import com.npupas.api.projections.PieChartStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface StatsRepository extends JpaRepository<Sale, Long> {

    @Query(value = "SELECT s.id AS transactionId, s.sale_date AS date, SUM(sd.total) AS total " +
            "FROM sale s " +
            "INNER JOIN sales_detail sd ON sd.id_sale = s.id " +
            "WHERE s.id_branch = :branchId AND DATE(s.sale_date) = DATE(:date) " +
            "GROUP BY s.id", nativeQuery = true)
    List<ChartStats> getDailySaleStats(@Param("branchId") Long branchId, @Param("date") Date date);

    @Query(value = "SELECT s.id AS transactionId, s.sale_date AS date, SUM(sd.total) AS total " +
            "FROM sale s " +
            "INNER JOIN sales_detail sd ON sd.id_sale = s.id " +
            "WHERE s.id_branch = :branchId AND s.sale_date BETWEEN :from AND :to " +
            "GROUP BY s.id", nativeQuery = true)
    List<ChartStats> getRangeSalesStats(@Param("branchId") Long branchId, @Param("from") Date from, @Param("to") Date to);

    @Query(value = "SELECT p.id AS transactionId, p.purchase_date AS date, p.amount AS total " +
            "FROM purchase p " +
            "WHERE p.id_branch = :branchId AND DATE(p.purchase_date) = DATE(:date)", nativeQuery = true)
    List<ChartStats> getDailyPurchasesStats(@Param("branchId") Long branchId, @Param("date") Date date);

    @Query(value = "SELECT p.id AS transactionId, p.purchase_date AS date, p.amount AS total " +
            "FROM purchase p " +
            "WHERE p.id_branch = :branchId AND p.purchase_date BETWEEN :from AND :to", nativeQuery = true)
    List<ChartStats> getRangePurchasesStats(@Param("branchId") Long branchId, @Param("from") Date from, @Param("to") Date to);

}
