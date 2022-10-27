package com.npupas.api.models.entities;

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
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
	private LocalDate openingDate;
	
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
	
	public Branch() {
		super();
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public LocalDate getOpeningDate() {
		return openingDate;
	}

	public void setOpeningDate(LocalDate openingDate) {
		this.openingDate = openingDate;
	}

	public Pupuseria getPupuseria() {
		return pupuseria;
	}

	public void setPupuseria(Pupuseria pupuseria) {
		this.pupuseria = pupuseria;
	}

	public List<Purchase> getPurchases() {
		return purchases;
	}

	public void setPurchases(List<Purchase> purchases) {
		this.purchases = purchases;
	}

	public List<Sale> getSales() {
		return sales;
	}

	public void setSales(List<Sale> sales) {
		this.sales = sales;
	}

	public List<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	} 
	
	
}
