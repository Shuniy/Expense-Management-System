package com.sk.wmsapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sk.wmsapi.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

}
