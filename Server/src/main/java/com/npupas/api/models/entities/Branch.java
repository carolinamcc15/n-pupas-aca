package com.npupas.api.models.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "branch")
public class Branch {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "branch_id_gen", sequenceName = "branch_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "branch_id_gen")
	private Long ID;
	
	@Column
	private String name;
	
	@Column
	private String address;
	
	@Column(name = "opening_date")
	private Date openingDate;

	@Column
	private Double latitude;

	@Column
	private Double longitude;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "id_pupuseria", nullable = true)
	private Pupuseria pupuseria;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "branch", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Purchase> purchases;
	
	@JsonIgnore
	@OneToMany(mappedBy = "branch", fetch = FetchType.LAZY)
	private List<Sale> sales;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "branch", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE })
	private List<Employee> employees;

	@OneToOne(mappedBy = "branch",  cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private Schedule schedule;
}

