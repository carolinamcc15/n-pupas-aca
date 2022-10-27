package com.npupas.api.services.implementations;

import java.io.IOException;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.npupas.api.models.dtos.AddProductDTO;
import com.npupas.api.models.entities.Product;
import com.npupas.api.models.entities.ProductType;
import com.npupas.api.models.entities.Pupuseria;
import com.npupas.api.models.entities.Token;
import com.npupas.api.repositories.ProductRepository;
import com.npupas.api.repositories.ProductTypeRepository;
import com.npupas.api.repositories.PupuseriaRepository;
import com.npupas.api.repositories.TokenRepository;
import com.npupas.api.services.MenuService;

@Service
public class MenuServiceImpl implements MenuService {

	@Autowired
	ProductRepository productRepository;

	@Autowired
	PupuseriaRepository pupuseriaRepository;

	@Autowired
	ProductTypeRepository productTypeRepository;

	@Autowired
	TokenRepository tokenRepository;

	@Override
	public List<Product> getAllProducts(Long pupuseriaId) {
		Pupuseria pupuseria = pupuseriaRepository.findById(pupuseriaId).orElse(null);
		if (pupuseria == null)
			return null;

		return pupuseria.getProducts();

	}

	@Override
	public Product getOneProduct(String tokenStr, Long productId) {
		Pupuseria pupuseria = tokenRepository.findByContent(tokenStr.substring(7)).getUser().getAdmin().getPupuseria();
		if (pupuseria == null)
			return null;

		List<Product> products = pupuseria.getProducts().stream().filter(p -> p.getID() == productId).toList();
		if (products.size() <= 0)
			return null;

		Product product = products.get(0);
		return product;
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public Boolean createProduct(String tokenStr, AddProductDTO dto) {
		Token token = tokenRepository.findByContent(tokenStr.substring(7));
		Pupuseria pupuseria = token.getUser().getAdmin().getPupuseria();
		try {

			Product product = new Product();
			MultipartFile[] file = dto.getImage();

			if (file != null) {
				byte[] byteObjects = new byte[file[0].getBytes().length];

				int i = 0;

				for (byte b : file[0].getBytes()) {
					byteObjects[i++] = b;
				}

				product.setImage(byteObjects);
			} else {
				product.setImage(null);
			}

			product.setName(dto.getNameProduct());
			product.setPrice(dto.getPrice());

			ProductType type = productTypeRepository.findById(dto.getTypeID()).get();
			product.setType(type);
			product.setPupuseria(pupuseria);

			productRepository.save(product);
			return true;
		} catch (IOException e) {
			// TODO Auto-generated catch block

			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public Boolean updateProduct(String tokenStr, Long productId, AddProductDTO dto) {
		try {
			Product product = productRepository.findById(productId).orElse(null);
			if (product == null)
				return false;

			MultipartFile[] file = dto.getImage();

			if (file != null) {
				byte[] byteObjects = new byte[file[0].getBytes().length];

				int i = 0;

				for (byte b : file[0].getBytes()) {
					byteObjects[i++] = b;
				}

				product.setImage(byteObjects);
			}
			
			product.setName(dto.getNameProduct());
			product.setPrice(dto.getPrice());

			ProductType type = productTypeRepository.findById(dto.getTypeID()).get();
			product.setType(type);

			productRepository.save(product);
			return true;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Boolean deleteProduct(String tokenStr, Long productId) {
		Pupuseria pupuseria = tokenRepository.findByContent(tokenStr.substring(7)).getUser().getAdmin().getPupuseria();
		if (pupuseria == null)
			return false;

		List<Product> products = pupuseria.getProducts().stream().filter(p -> p.getID() == productId).toList();
		if (products.size() <= 0)
			return false;

		productRepository.delete(products.get(0));
		return true;
	}

}
