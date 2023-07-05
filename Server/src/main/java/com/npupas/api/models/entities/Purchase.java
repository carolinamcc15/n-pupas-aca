package com.npupas.api.models.entities;

import java.math.BigDecimal;
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

@Setter
@Getter
@NoArgsConstructor
@Entity(name = "purchase")
public class Purchase {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "purchase_id_gen", sequenceName = "purchase_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "purchase_id_gen")
	private Long ID;
	
	@Column(name = "purchase_date")
	private Date purchaseDate;
	
	@Column
	private String concept;
	
	@Column
	private BigDecimal amount;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "id_branch", nullable = true)
	private Branch branch;
}
