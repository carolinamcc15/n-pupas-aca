package com.npupas.api.models.entities;

import java.util.List;
import java.util.Set;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "user")
@NoArgsConstructor
@Getter
@Setter
public class User {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "user_id_gen", sequenceName = "user_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_gen")
	private Long ID;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "name")
	private String name;
	
	@JsonIgnore
	@Column(name = "password")
	private String password;
	
	@OneToOne(mappedBy = "user")
	@JsonBackReference
	@NotFound(action = NotFoundAction.IGNORE)
	private Admin admin;
	
	@OneToOne(mappedBy = "user")
	@JsonBackReference
	@NotFound(action = NotFoundAction.IGNORE)
	private Employee employee;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Token> tokens;

}
