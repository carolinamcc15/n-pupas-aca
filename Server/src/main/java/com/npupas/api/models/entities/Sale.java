package com.npupas.api.models.entities;

import java.util.Date;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "sale")
public class Sale {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "sale_id_gen", sequenceName = "sale_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sale_id_gen")
	private Long ID;
	
	@Column(name = "sale_date")
	private Date saleDate;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "id_branch", nullable = true)
	private Branch branch;
	
	@OneToMany(mappedBy = "sale", cascade = CascadeType.ALL)
	private List<SalesDetail> details;
}
