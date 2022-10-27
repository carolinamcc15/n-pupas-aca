package com.npupas.api.models.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity(name = "sales_details_mass")
public class SalesDetailMass {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "sales_details_mass_id_gen", sequenceName = "sales_details_mass_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sales_details_mass_id_gen")
	@JsonIgnore
	private Long ID;
	
	@OneToOne
	@JoinColumn(name = "id_sale_detail")
	@JsonIgnore
	private SalesDetail details;
	
	@JoinColumn(name = "id_mass")
	@ManyToOne
	private Mass mass;

	public SalesDetailMass(Long iD, SalesDetail details, Mass mass) {
		super();
		ID = iD;
		this.details = details;
		this.mass = mass;
	}

	public SalesDetailMass() {
		super();
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public SalesDetail getDetails() {
		return details;
	}

	public void setDetails(SalesDetail details) {
		this.details = details;
	}

	public Mass getMass() {
		return mass;
	}

	public void setMass(Mass mass) {
		this.mass = mass;
	}
	
	
}
