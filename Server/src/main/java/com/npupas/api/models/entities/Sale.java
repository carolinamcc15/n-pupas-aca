package com.npupas.api.models.entities;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity(name = "sale")
public class Sale {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "sale_id_gen", sequenceName = "sale_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sale_id_gen")
	private Long ID;
	
	@Column(name = "sale_date")
	private LocalDate saleDate;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "id_branch", nullable = true)
	private Branch branch;
	
	@OneToMany(mappedBy = "sale", cascade = CascadeType.ALL)
	private List<SalesDetail> details;

	public Sale() {
		super();
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public LocalDate getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(LocalDate saleDate) {
		this.saleDate = saleDate;
	}

	public Branch getBranch() {
		return branch;
	}

	public void setBranch(Branch branch) {
		this.branch = branch;
	}

	public List<SalesDetail> getDetails() {
		return details;
	}

	public void setDetails(List<SalesDetail> details) {
		this.details = details;
	}
	
	
}
