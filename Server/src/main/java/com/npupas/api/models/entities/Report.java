package com.npupas.api.models.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name= "report")
public class Report {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "report_id_gen", sequenceName = "report_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_id_gen")
	private Long ID;
	
	@Column
	private String comment;
	
	@Column(name = "report_date")
	private Date reportDate;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "id_admin")
	private Admin admin;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "id_employee")
	private Employee employee;
}