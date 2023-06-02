package com.npupas.api.models.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "employee")
public class Employee {

	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "user_id_gen", sequenceName = "user_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_gen")
	private Long ID;

	@Column
	private BigDecimal salary;

	@Column(name = "afp_accumulated")
	private BigDecimal Afp;

	@Column(name = "isss_accumulated")
	private BigDecimal Isss;

	@Column(name = "rent_accumulated")
	private BigDecimal Rent;

	@Column(name = "hiring_date")
	private LocalDate hiringDate;

	@JoinColumn(name = "user_id")
	@JsonManagedReference
	@OneToOne(cascade = CascadeType.ALL)
	User user;

	@OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE })
	@JsonManagedReference
	private List<Report> reports;

	@OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE })
	@JsonManagedReference
	private List<Task> tasks;

	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "branch_id", nullable = true)
	private Branch branch;
}
