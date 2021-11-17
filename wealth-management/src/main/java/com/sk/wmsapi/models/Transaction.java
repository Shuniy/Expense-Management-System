package com.sk.wmsapi.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Transaction {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer transactionId;
    private Integer userId;
    private String title = "";
    private Double amount = 0.0;
    private String note = "";
    private LocalDate transactionDate = LocalDate.now();
}
