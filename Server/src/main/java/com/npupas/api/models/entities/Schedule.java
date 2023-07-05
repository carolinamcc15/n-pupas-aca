package com.npupas.api.models.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "schedule")
@Getter
@Setter
@NoArgsConstructor
public class Schedule {
    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "schedule_id_gen", sequenceName = "schedule_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "schedule_id_gen")
    private Long ID;

    @Column
    private String openingTime;

    @Column
    private String closingTime;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "branch_id", referencedColumnName = "id")
    private Branch branch;
}

