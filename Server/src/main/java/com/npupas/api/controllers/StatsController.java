package com.npupas.api.controllers;

import com.npupas.api.models.dtos.*;
import com.npupas.api.services.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


/** Rest controller for Pupuserias Statistics
 * */
@RestController
@RequestMapping("/stats")
public class StatsController {

    /** Main stack service for statistics */
    @Autowired
    StatsService service;

    /** Method for sales statistics for today */
    @GetMapping("/sales/today/{branchId}")
    public ResponseEntity<List<DailyStatDTO>> getTodaySalesStats(@PathVariable("branchId") Long branchId){
        return ResponseEntity.ok(service.getTodaySaleStatsByBranchId(branchId));
    }

    /** Method for sales statistics based on a date given from client */
    @PostMapping("/sales/daily/{branchId}")
    public ResponseEntity<List<DailyStatDTO>> getDailySalesStats(@PathVariable("branchId") Long branchId, @RequestBody StatRequestDTO requestDTO){
        return ResponseEntity.ok(service.getDailySaleStatsByBranchId(branchId, requestDTO.getFrom()));
    }

    /** Method for purchases statistics for today */
    @GetMapping("/purchases/today/{branchId}")
    public ResponseEntity<List<DailyStatDTO>> getTodayPurchasesStats(@PathVariable("branchId") Long branchId){
        return ResponseEntity.ok(service.getTodayPurchasesStatsByBranchId(branchId));
    }

    /** Method for purchases statistics for a given date from client */
    @PostMapping("/purchases/daily/{branchId}")
    public ResponseEntity<List<DailyStatDTO>> getDailyPurchasesStats(@PathVariable("branchId") Long branchId, @RequestBody StatRequestDTO requestDTO){
        return ResponseEntity.ok(service.getDailyPurchasesStatsByBranchId(branchId, requestDTO.getFrom()));
    }

    /** Method for sales statistics for a date range */
    @PostMapping("/sales/range/{branchId}")
    public ResponseEntity<List<RangeStatDTO>> getRangeSalesStats(@PathVariable("branchId") Long branchId, @RequestBody StatRequestDTO requestDTO){
        return ResponseEntity.ok(service.getRangeSalesStatsByBranchId(branchId, requestDTO));
    }

    /** Method for purchase statistics for a date range */
    @PostMapping("/purchases/range/{branchId}")
    public ResponseEntity<List<RangeStatDTO>> getRangePurchaseStats(@PathVariable("branchId") Long branchId, @RequestBody StatRequestDTO requestDTO){
        return ResponseEntity.ok(service.getRangePurchasesStatsByBranchId(branchId, requestDTO));
    }

    /** Method for sales statistics for the current month */
    @GetMapping("/sales/current-month")
    public ResponseEntity<List<PairStatDTO>> getBranchesMonthSalesStats(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(service.getBranchesMonthSalesStats(token));
    }

    /** Method for sales statistics by categories for the current month */
    @GetMapping("/sales/categories/current-month")
    public ResponseEntity<List<PairStatDTO>> getBranchesMonthCategoriesSalesStats(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(service.getBranchesMonthCategorySalesStats(token));
    }

    /** Method for all linechart stats getting it by branch id */
    @GetMapping("/linechart/month/{branchId}")
    public ResponseEntity<LineChartGroupDTO> getLinechartsStats(@PathVariable("branchId") Long branchId) {
        return ResponseEntity.ok(service.getLinechartMonthStats(branchId));
    }
}
