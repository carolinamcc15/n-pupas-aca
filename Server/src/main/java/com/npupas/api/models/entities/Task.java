package com.npupas.api.models.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.npupas.api.enums.TaskStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity(name= "task")
public class Task {
    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "task_id_gen", sequenceName = "task_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_id_gen")
    private Long ID;

    @Column(name = "taskdescription")
    private String description;

    @Column(name = "initdate")
    private Date deadlineDate;

    @Column(name = "finishdate")
    private Date finishDate;

    @Column
    private TaskStatus status;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_admin")
    private Admin admin;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_employee")
    private Employee employee;
}
