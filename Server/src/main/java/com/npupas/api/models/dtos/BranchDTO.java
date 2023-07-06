package com.npupas.api.models.dtos;

import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Schedule;
import com.npupas.api.utils.DateUtils;
import lombok.Data;

import java.util.Date;
import java.util.Optional;

@Data
public class BranchDTO {
    private Long id;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Date openingDate;
    private String openingTime;
    private String closingTime;
    private String pupuseria;
    private boolean isOpen;

    public BranchDTO(Branch branch) {
        this.id = branch.getID();
        this.name = branch.getName();
        this.address = branch.getAddress();
        this.latitude = Optional.ofNullable(branch.getLatitude()).orElse(0d);
        this.longitude = Optional.ofNullable(branch.getLongitude()).orElse(0d);
        this.openingDate = branch.getOpeningDate();
        this.openingTime = Optional.ofNullable(branch.getSchedule()).map(Schedule::getOpeningTime).orElse("09:00");
        this.closingTime = Optional.ofNullable(branch.getSchedule()).map(Schedule::getClosingTime).orElse("17:00");
        this.pupuseria = branch.getPupuseria().getName();
        this.isOpen = DateUtils.isBetweenTwoTimes(this.openingTime, this.closingTime);
    }
}