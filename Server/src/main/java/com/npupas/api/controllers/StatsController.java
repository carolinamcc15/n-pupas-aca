package com.npupas.api.controllers;

import com.npupas.api.models.dtos.*;
import com.npupas.api.services.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/stats")
public class StatsController {

    @Autowired
    StatsService service;

    @GetMapping("/sales/today/{branchId}")
    public ResponseEntity<List<DailyStatDTO>> getTodaySalesStats(@PathVariable("branchId") Long branchId){
        return ResponseEntity.ok(service.getTodaySaleStatsByBranchId(branchId));
    }

    @PostMapping("/sales/daily/{branchId}")
    public ResponseEntity<List<DailyStatDTO>> getDailySalesStats(@PathVariable("branchId") Long branchId, @RequestBody StatRequestDTO requestDTO){
        return ResponseEntity.ok(service.getDailySaleStatsByBranchId(branchId, requestDTO.getFrom()));
    }

    @GetMapping("/purchases/today/{branchId}")
    public ResponseEntity<List<DailyStatDTO>> getTodayPurchasesStats(@PathVariable("branchId") Long branchId){
        return ResponseEntity.ok(service.getTodayPurchasesStatsByBranchId(branchId));
    }

    @PostMapping("/purchases/daily/{branchId}")
    public ResponseEntity<List<DailyStatDTO>> getDailyPurchasesStats(@PathVariable("branchId") Long branchId, @RequestBody StatRequestDTO requestDTO){
        return ResponseEntity.ok(service.getDailyPurchasesStatsByBranchId(branchId, requestDTO.getFrom()));
    }

    @PostMapping("/sales/range/{branchId}")
    public ResponseEntity<List<RangeStatDTO>> getRangeSalesStats(@PathVariable("branchId") Long branchId, @RequestBody StatRequestDTO requestDTO){
        return ResponseEntity.ok(service.getRangeSalesStatsByBranchId(branchId, requestDTO));
    }

    @PostMapping("/purchases/range/{branchId}")
    public ResponseEntity<List<RangeStatDTO>> getRangePurchaseStats(@PathVariable("branchId") Long branchId, @RequestBody StatRequestDTO requestDTO){
        return ResponseEntity.ok(service.getRangePurchasesStatsByBranchId(branchId, requestDTO));
    }

    @GetMapping("/sales/current-month")
    public ResponseEntity<List<PairStatDTO>> getBranchesMonthSalesStats(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(service.getBranchesMonthSalesStats(token));
    }

    @GetMapping("/sales/categories/current-month")
    public ResponseEntity<List<PairStatDTO>> getBranchesMonthCategoriesSalesStats(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(service.getBranchesMonthCategorySalesStats(token));
    }

    @GetMapping("/linechart/month/{branchId}")
    public ResponseEntity<LineChartGroupDTO> getLinechartsStats(@PathVariable("branchId") Long branchId) {
        return ResponseEntity.ok(service.getLinechartMonthStats(branchId));
    }
}
