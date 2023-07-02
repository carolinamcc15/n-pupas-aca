package com.npupas.api.models.dtos;

import com.npupas.api.projections.PairStat;
import lombok.Data;

@Data
public class PairStatDTO {
    private String title;
    private Double total;

    public PairStatDTO(PairStat stat) {
        title = stat.getTitle();
        total = stat.getTotal();
    }
}
