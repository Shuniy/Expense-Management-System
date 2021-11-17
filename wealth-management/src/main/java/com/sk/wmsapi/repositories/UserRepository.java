package com.sk.wmsapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sk.wmsapi.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
}
