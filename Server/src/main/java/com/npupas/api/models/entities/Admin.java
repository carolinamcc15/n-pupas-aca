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

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

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

	public Admin() {
		super();
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getDUI() {
		return DUI;
	}

	public void setDUI(String dUI) {
		DUI = dUI;
	}

	public String getNIT() {
		return NIT;
	}

	public void setNIT(String nIT) {
		NIT = nIT;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Pupuseria getPupuseria() {
		return pupuseria;
	}

	public void setPupuseria(Pupuseria pupuseria) {
		this.pupuseria = pupuseria;
	}

	public List<Report> getReports() {
		return reports;
	}

	public void setReports(List<Report> reports) {
		this.reports = reports;
	}
	
	
	
}
