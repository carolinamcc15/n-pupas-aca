package com.npupas.api.models.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name="pupuseria")
public class Pupuseria {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "pupuseria_id_gen", sequenceName = "pupuseria_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pupuseria_id_gen")
	private Long ID;
	
	@Column
	private String name;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_admin")
	@JsonIgnore
	private Admin admin;
	
	@OneToMany(mappedBy = "pupuseria")
	private List<Branch> branches;
	
	@OneToMany(mappedBy = "pupuseria")
	private List<Product> products;
	
}
