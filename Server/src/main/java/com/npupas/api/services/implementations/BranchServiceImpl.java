package com.npupas.api.services.implementations;

import java.util.List;
import java.util.Optional;

import com.npupas.api.models.dtos.BranchDTO;
import com.npupas.api.models.entities.Admin;
import com.npupas.api.models.entities.Schedule;
import com.npupas.api.repositories.ScheduleRepository;
import com.npupas.api.services.AdminService;
import com.npupas.api.utils.Utils;
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

	@Autowired
	ScheduleRepository scheduleRepository;
	@Autowired
	AdminService adminService;

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
		Branch foundBranch = branchRepository.findBranchById(id).get(0);
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
		branchToSave.setLatitude(branchDTO.getLatitude());
		branchToSave.setLongitude(branchDTO.getLongitude());

		Schedule schedule = new Schedule();
		schedule.setOpeningTime(branchDTO.getOpeningTime());
		schedule.setClosingTime(branchDTO.getClosingTime());

		branchToSave = branchRepository.save(branchToSave);
		schedule.setBranch(branchToSave);
		schedule = scheduleRepository.save(schedule);


		branchToSave.setSchedule(schedule);
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
		branch.setLatitude(branchDTO.getLatitude());
		branch.setLongitude(branchDTO.getLongitude());

		if (Optional.ofNullable(branch.getSchedule()).isPresent()) {
			branch.getSchedule().setOpeningTime(branchDTO.getOpeningTime());
			branch.getSchedule().setClosingTime(branchDTO.getClosingTime());
		} else {
			Schedule schedule = new Schedule();
			schedule.setOpeningTime(branchDTO.getOpeningTime());
			schedule.setClosingTime(branchDTO.getClosingTime());

			branch = branchRepository.save(branch);
			schedule.setBranch(branch);
			schedule = scheduleRepository.save(schedule);


			branch.setSchedule(schedule);
		}

		branchRepository.save(branch);
	}
}