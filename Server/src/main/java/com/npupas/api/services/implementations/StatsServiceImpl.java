package com.npupas.api.services.implementations;

import com.npupas.api.models.dtos.*;
import com.npupas.api.models.entities.Admin;
import com.npupas.api.repositories.StatsRepository;
import com.npupas.api.services.AdminService;
import com.npupas.api.services.StatsService;
import com.npupas.api.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.npupas.api.utils.DateUtils.getDateInstant;

@Service
public class StatsServiceImpl implements StatsService {

    @Autowired
    AdminService adminService;

    @Autowired
    StatsRepository repository;

    @Override
    public List<DailyStatDTO> getDailySaleStatsByBranchId(Long branchId, Date date) {
        List<SaleStatDTO> stats = repository.getDailySaleStats(branchId, date).stream().map(SaleStatDTO::new).toList();

        return buildDailyStats(stats);
    }

    @Override
    public List<DailyStatDTO> getTodaySaleStatsByBranchId(Long branchId) {
        List<SaleStatDTO> stats = repository.getDailySaleStats(branchId, new Date()).stream().map(SaleStatDTO::new).toList();

        return buildDailyStats(stats);
    }

    @Override
    public List<RangeStatDTO> getRangeSalesStatsByBranchId(Long branchId, StatRequestDTO dto) {
        List<SaleStatDTO> stats = repository.getRangeSalesStats(branchId, dto.getFrom(), dto.getTo())
                .stream().map(SaleStatDTO::new).toList();

        return buildRangeStats(stats);
    }

    @Override
    public List<RangeStatDTO> getRangePurchasesStatsByBranchId(Long branchId, StatRequestDTO dto) {
        List<SaleStatDTO> stats = repository.getRangePurchasesStats(branchId, dto.getFrom(), dto.getTo())
                .stream().map(SaleStatDTO::new).toList();

        return buildRangeStats(stats);
    }

    @Override
    public List<DailyStatDTO> getTodayPurchasesStatsByBranchId(Long branchId) {
        List<SaleStatDTO> stats = repository.getDailyPurchasesStats(branchId, new Date()).stream().map(SaleStatDTO::new).toList();

        return buildDailyStats(stats);
    }

    @Override
    public List<DailyStatDTO> getDailyPurchasesStatsByBranchId(Long branchId, Date date) {
        List<SaleStatDTO> stats = repository.getDailyPurchasesStats(branchId, date).stream().map(SaleStatDTO::new).toList();

        return buildDailyStats(stats);
    }

    @Override
    public List<PairStatDTO> getBranchesMonthSalesStats(String entireToken) {
        Admin admin = adminService.getAdminByToken(Utils.getToken(entireToken));

        return repository.getBranchesMonthSalesStats(admin.getID()).stream().map(PairStatDTO::new).toList();
    }

    @Override
    public List<PairStatDTO> getBranchesMonthCategorySalesStats(String entireToken) {
        Admin admin = adminService.getAdminByToken(Utils.getToken(entireToken));

        return repository.getBranchesMonthCategorySalesStats(admin.getID()).stream().map(PairStatDTO::new).toList();
    }

    private List<RangeStatDTO> buildRangeStats(List<SaleStatDTO> stats) {
        SortedMap<Long, Double> timeSaleMap = new TreeMap<>();

        stats.forEach(stat -> {
            Long dateInstant = getDateInstant(stat.getSaleDate());
            if (timeSaleMap.containsKey(dateInstant)){
                timeSaleMap.put(dateInstant, timeSaleMap.get(dateInstant) + stat.getSaleTotal());
            } else {
                timeSaleMap.put(dateInstant, stat.getSaleTotal());
            }
        });

        return timeSaleMap.entrySet().stream().map(entry -> new RangeStatDTO(new Date(entry.getKey()), entry.getValue())).toList();
    }

    private List<DailyStatDTO> buildDailyStats(List<SaleStatDTO> stats){
        SortedMap<Integer, Double> timeSaleMap = new TreeMap<>();
        Calendar calendar = Calendar.getInstance();

        stats.forEach(stat -> {
            calendar.setTime(stat.getSaleDate());
            Integer hour = calendar.get(Calendar.HOUR);
            if (timeSaleMap.containsKey(hour)){
                timeSaleMap.put(hour, timeSaleMap.get(hour) + stat.getSaleTotal());
            } else {
                timeSaleMap.put(hour, stat.getSaleTotal());
            }
        });

        return timeSaleMap.entrySet().stream().map(entry -> new DailyStatDTO(entry.getKey(), entry.getValue())).toList();
    }
}
