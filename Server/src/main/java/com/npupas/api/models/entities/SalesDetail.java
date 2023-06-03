package com.npupas.api.models.entities;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import com.npupas.api.enums.Mass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
@Getter
@Setter
@NoArgsConstructor
@Entity(name = "sales_detail")
public class SalesDetail {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "sales_detail_id_gen", sequenceName = "sales_detail_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sales_detail_id_gen")
	private Long ID;
	
	@Column
	private Long amount;
	
	@Column
	private BigDecimal total;

	@Column
	private Mass mass;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "id_sale", nullable = true)
	private Sale sale;
	
	@ManyToOne
	@JsonManagedReference
	@JoinColumn(name = "id_product", nullable = true)
	private Product product;
}
