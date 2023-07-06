package com.npupas.api.models.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "admin")
public class Admin {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "admin_id_gen", sequenceName = "admin_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_id_gen")
	private Long ID;
	
	@Column(name="dui")
	private String DUI;
	
	@Column(name="nit")
	private String NIT;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	User user;
	
	@OneToOne(mappedBy = "admin")
	private Pupuseria pupuseria;
	
	@OneToMany(mappedBy = "admin", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE })
	private List<Report> reports;

	@OneToMany(mappedBy = "admin", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE })
	@JsonManagedReference
	private List<Task> tasks;
	
}
