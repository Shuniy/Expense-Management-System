package com.sk.wmsapi.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sk.wmsapi.models.Transaction;
import com.sk.wmsapi.services.TransactionService;

@RestController
@RequestMapping("/api/users/{userId}/transactions")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TransactionController {

	@Autowired
	TransactionService transactionService;

	@PostMapping("/add")
	public ResponseEntity<Transaction> addTransaction(@PathVariable("userId") Integer userId) {

		String title = "Please Add Something !";
		String note = "Please Add Something";
		Double amount = 0.0;
		LocalDate transactionDate = LocalDate.now();

		Transaction transaction = new Transaction();
		transaction.setUserId(userId);
		transaction.setTitle(title);
		transaction.setNote(note);
		transaction.setAmount(amount);
		transaction.setTransactionDate(transactionDate);

		Transaction added = transactionService.addTransaction(transaction);
		return new ResponseEntity<>(added, HttpStatus.CREATED);
	}

	@GetMapping("")
	public ResponseEntity<List<Transaction>> getAllTransactions(@PathVariable("userId") Integer userId) {
		return new ResponseEntity<>(transactionService.getAllTransactions(userId), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Transaction> getTransactionById(@PathVariable Integer id,
			@PathVariable("userId") Integer userId) {

		Transaction getbyId = transactionService.getTransactionById(userId, id);
		return new ResponseEntity<>(getbyId, HttpStatus.OK);

	}

	@PutMapping("{id}/update")
	public ResponseEntity<Transaction> updateCategory(@RequestBody Map<String, Object> data, @PathVariable Integer id,
			@PathVariable("userId") Integer userId) {

		System.out.println(data.get("title"));
		Transaction transaction = new Transaction();
		transaction.setUserId(userId);
		transaction.setTransactionId(id);
		transaction.setTitle((String) data.get("title"));
		transaction.setNote((String) data.get("note"));
		transaction.setAmount(Double.parseDouble((String) data.get("amount")));
		transaction.setTransactionDate(LocalDate.now());

		Transaction updateById = transactionService.updateTransaction(userId, id, transaction);
		return new ResponseEntity<>(updateById, HttpStatus.OK);

	}

	@DeleteMapping("{id}/delete")
	public ResponseEntity<Boolean> deleteCategory(@PathVariable Integer id,
			@PathVariable("userId") Integer userId) {
		boolean status;
		status = transactionService.removeTransaction(userId, id);
		return new ResponseEntity<>(status, HttpStatus.OK);
	}
}
