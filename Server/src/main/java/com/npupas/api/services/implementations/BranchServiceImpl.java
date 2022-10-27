package com.npupas.api.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.npupas.api.models.dtos.AddBranchDTO;
import com.npupas.api.models.entities.Branch;
import com.npupas.api.models.entities.Pupuseria;
import com.npupas.api.repositories.BranchRepository;
import com.npupas.api.repositories.PupuseriaRepository;
import com.npupas.api.services.BranchService;

@Service
public class BranchServiceImpl implements BranchService {

	@Autowired
	BranchRepository branchRepository;

	@Autowired
	PupuseriaRepository pupuseriaRepository;

	@Override
	public List<Branch> getAllBranches(Long pupuseriaId) {
		Pupuseria pupuseria = pupuseriaRepository.findById(pupuseriaId).orElse(null);
		if (pupuseria == null) {
			return null;
		}

		List<Branch> foundBranches = branchRepository.findByPupuseria(pupuseria);
		return foundBranches;
	}

	@Override
	public Branch getOneBranch(Long id) {
		Branch foundBranch = branchRepository.findById(id).orElse(null);
		return foundBranch;
	}

	@Override
	public void createBranch(Long pupuseriId, AddBranchDTO branchDTO) {
		Pupuseria pupuseria = pupuseriaRepository.findById(pupuseriId).orElse(null);

		Branch branchToSave = new Branch();
		branchToSave.setAddress(branchDTO.getAddress());
		branchToSave.setName(branchDTO.getNameBranch());
		branchToSave.setOpeningDate(branchDTO.getOpeningDate());
		branchToSave.setPupuseria(pupuseria);

		branchRepository.save(branchToSave);
	}

	@Override
	public void delete(Long branchId) {
		branchRepository.deleteById(branchId);
	}

	@Override
	public void update(Branch branch, AddBranchDTO branchDTO) {
		branch.setAddress(branchDTO.getAddress());
		branch.setName(branchDTO.getNameBranch());
		branch.setOpeningDate(branchDTO.getOpeningDate());

		branchRepository.save(branch);
	}

}
