package com.npupas.api.services;

import java.util.List;

import com.npupas.api.models.dtos.AddBranchDTO;
import com.npupas.api.models.dtos.BranchDTO;
import com.npupas.api.models.entities.Branch;

public interface BranchService {

	List<Branch> getAllBranches(Long pupuseriaId);

	Branch getOneBranch(Long branchId);

	void createBranch(Long pupuseriaId, AddBranchDTO branchDTO);

	void delete(Long branchId);

	void update(Branch branch, AddBranchDTO updatedBranch);

	List<BranchDTO> getCompetenceBranches(String fullToken);

}
