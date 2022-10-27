package com.npupas.api.models.dtos;

import java.math.BigDecimal;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

public class AddProductDTO {

	@NotBlank(message = "Name of the product cannot be blank!")
	@Size(min = 8, message = "Name of the product has to be 8 characters minimum")
	private String nameProduct;

	private BigDecimal price;

	@NotNull(message = "Type cannot be null")
	private Long typeID;
	
	@Nullable
	private MultipartFile[] image;

	public AddProductDTO() {
		super();
	}

	public AddProductDTO(
			@NotBlank(message = "Name of the product cannot be blank!") @Size(min = 8, message = "Name of the product has to be 8 characters minimum") String nameProduct,
			@NotBlank(message = "Price cannot be blank!") BigDecimal price,
			@NotNull(message = "Type cannot be null") Long typeID,
			MultipartFile[] image) {
		super();
		this.nameProduct = nameProduct;
		this.price = price;
		this.typeID = typeID;
		this.image = image;
	}

	public String getNameProduct() {
		return nameProduct;
	}

	public void setNameProduct(String nameProduct) {
		this.nameProduct = nameProduct;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Long getTypeID() {
		return typeID;
	}

	public void setTypeID(Long typeID) {
		this.typeID = typeID;
	}

	public MultipartFile[] getImage() {
		return image;
	}

	public void setImage(MultipartFile[] image) {
		this.image = image;
	}

}
