package com.npupas.api.repositories;

import com.npupas.api.models.entities.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}