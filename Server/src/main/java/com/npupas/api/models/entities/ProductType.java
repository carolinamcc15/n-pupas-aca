package com.npupas.api.models.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

@Entity(name = "type")
public class ProductType {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "type_id_gen", sequenceName = "type_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "type_id_gen")
	private Long ID;
	
	@Column
	private String type;
	
	@OneToMany(mappedBy = "type")
	private List<Product> products;

	public ProductType(Long iD, String type) {
		super();
		ID = iD;
		this.type = type;
	}

	public ProductType() {
		super();
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	
}
