package com.npupas.api.services.implementations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.npupas.api.models.dtos.AddSaleDTO;
import com.npupas.api.models.dtos.SalesDetailsDTO;
import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Mass;
import com.npupas.api.models.entities.Product;
import com.npupas.api.models.entities.Sale;
import com.npupas.api.models.entities.SalesDetail;
import com.npupas.api.models.entities.SalesDetailMass;
import com.npupas.api.repositories.BranchRepository;
import com.npupas.api.repositories.MassRepository;
import com.npupas.api.repositories.ProductRepository;
import com.npupas.api.repositories.SalesDetailsMassRepository;
import com.npupas.api.repositories.SalesDetailsRepository;
import com.npupas.api.repositories.SalesRepository;
import com.npupas.api.services.SalesService;

@Service
public class SalesServiceImpl implements SalesService {

	@Autowired
	SalesRepository salesRepository;

	@Autowired
	BranchRepository branchRepository;

	@Autowired
	ProductRepository productRepository;

	@Autowired
	SalesDetailsMassRepository detailsMassRepository;

	@Autowired
	MassRepository massRepository;

	@Autowired
	SalesDetailsRepository detailsRepository;

	@Override
	public List<Sale> getAllSales(Long branchId) {
		Branch branch = branchRepository.findById(branchId).orElse(null);
		if (branch == null)
			return null;

		return branch.getSales();
	}

	@Override
	public List<Sale> getTodaySales(Long branchId) {
		Branch branch = branchRepository.findById(branchId).orElse(null);
		if (branch == null)
			return null;

		List<Sale> sales = salesRepository.findBySaleDateAndBranch(LocalDate.now(), branch);

		return sales;
	}

	@Override
	public List<Sale> getSalesBetweenDates(Long branchId, LocalDate initialDate, LocalDate finalDate) {
		List<Sale> sales = salesRepository.findBetweenDates(branchId, initialDate, finalDate);
		return sales;
	};

	@Override
	public Sale getSale(Long branchId, Long idSale) {
		Branch branch = branchRepository.findById(branchId).orElse(null);
		if (branch == null)
			return null;

		List<Sale> sales = branch.getSales();
		Sale sale = null;
		if (sales.size() > 0) {
			sales = sales.stream().filter(s -> s.getID() == idSale).toList();
			if (sales.size() > 0)
				sale = sales.get(0);
		}

		return sale;
	}

	@Override
	public Boolean createSale(Long branchId, AddSaleDTO dto) {
		Branch branch = branchRepository.findById(branchId).orElse(null);
		if (branch == null)
			return false;

		Sale sale = new Sale();

		List<SalesDetail> details = new ArrayList<SalesDetail>();
		for (SalesDetailsDTO dt : dto.getDetails()) {
			SalesDetail detail = new SalesDetail();
			detail.setAmount(dt.getAmount());
			detail.setTotal(dt.getTotal());
			detail.setSale(sale);

			Product product = productRepository.findById(dt.getIdProducto()).orElse(null);
			if (product.getType().getType().equals("Pupusas")) {

				SalesDetailMass detailsMass = new SalesDetailMass();
				Mass mass = massRepository.findById(dt.getMass()).get();
				System.out.println("Lo que encontre es: " + dt.getMass());
				detailsMass.setMass(mass);

				detailsMass.setDetails(detail);
				detail.setMassDetails(detailsMass);
			}

			detail.setProduct(product);
			details.add(detail);
		}

		sale.setBranch(branch);
		sale.setSaleDate(dto.getDate());
		sale.setDetails(details);

		salesRepository.save(sale);
		return true;
	}

	@Override
	public Boolean updateSale(Long branchId, AddSaleDTO dto, Long saleId) {
		Branch branch = branchRepository.findById(branchId).orElse(null);
		if (branch == null)
			return false;

		Sale sale = salesRepository.findById(saleId).orElse(null);
		if (sale == null)
			return false;

		if (sale.getDetails().size() > 0) {
			List<SalesDetail> allDetails = sale.getDetails();
			sale.setDetails(null);
			detailsRepository.deleteAll(allDetails);
			salesRepository.save(sale);
		}

		List<SalesDetail> details = new ArrayList<SalesDetail>();
		for (SalesDetailsDTO dt : dto.getDetails()) {
			SalesDetail detail = new SalesDetail();
			detail.setAmount(dt.getAmount());
			detail.setTotal(dt.getTotal());
			detail.setSale(sale);

			Product product = productRepository.findById(dt.getIdProducto()).orElse(null);
			if (product.getType().getType().equals("Pupusas")) {

				SalesDetailMass detailsMass = new SalesDetailMass();
				if (dt.getMass() != null) {
					Mass mass = massRepository.findById(dt.getMass()).get();
					detailsMass.setMass(mass);
				} else {
					detailsMass.setMass(null);
				}

				detailsMass.setDetails(detail);

				detail.setMassDetails(detailsMass);
			}

			detail.setProduct(product);
			details.add(detail);
		}

		sale.setBranch(branch);
		sale.setSaleDate(dto.getDate());
		sale.setDetails(details);

		salesRepository.save(sale);
		return true;
	}

	@Override
	public Boolean deleteSale(Long branchId, Long saleId) {
		Branch branch = branchRepository.findById(branchId).orElse(null);
		if (branch == null)
			return null;

		List<Sale> sales = branch.getSales();
		Sale sale = null;
		if (sales.size() > 0) {
			sales = sales.stream().filter(s -> s.getID() == saleId).toList();
			if (sales.size() > 0)
				sale = sales.get(0);
		}
		if (sale == null)
			return false;

		salesRepository.delete(sale);
		return true;
	}

}
