package com.sk.wmsapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sk.wmsapi.Exceptions.EtBadRequestException;
import com.sk.wmsapi.Exceptions.EtResourceNotFoundException;
import com.sk.wmsapi.models.Transaction;
import com.sk.wmsapi.repositories.TransactionRepository;

@Service
public class TransactionServiceImplementation implements TransactionService {

	@Autowired
	TransactionRepository transactionRepository;

	public List<Transaction> getAllTransactions(Integer transactionId) {

		List<Transaction> data = new ArrayList<>();
		List<Transaction> transactions = transactionRepository.findAll();
		
		for (Transaction transaction : transactions) {
			if (transaction.getUserId().equals(transactionId)) {
				data.add(transaction);
			}
		}

		return data;
	}

	public Transaction addTransaction(Transaction transaction) throws EtBadRequestException {
		return transactionRepository.save(transaction);

	}

	public Transaction getTransactionById(Integer userId, Integer transactionId) throws EtResourceNotFoundException {

		ArrayList<Integer> transactionsIds = new ArrayList<>();
		transactionsIds.add(transactionId);
		List<Transaction> transactions = transactionRepository.findAllById(transactionsIds);

		for (Transaction item : transactions) {
			if (item.getUserId().equals(userId)) {
				return item;
			}
		}

		return null;
	}

	public Transaction updateTransaction(Integer userId, Integer transactionId, Transaction transaction) throws EtBadRequestException {

		Transaction fetchedTransaction = getTransactionById(userId, transactionId);

		if (fetchedTransaction == null) {
			return null;
		}

		fetchedTransaction.setTitle(transaction.getTitle());
		fetchedTransaction.setNote(transaction.getNote());
		fetchedTransaction.setAmount(transaction.getAmount());
		transactionRepository.save(fetchedTransaction);

		return fetchedTransaction;

	}

	public boolean removeTransaction(Integer userId, Integer categoryId) throws EtResourceNotFoundException {

		ArrayList<Integer> transactionIds = new ArrayList<>();
		transactionIds.add(categoryId);
		List<Transaction> categories = transactionRepository.findAllById(transactionIds);
		boolean status = false;
		for (Transaction item : categories) {
			if (item.getUserId().equals(userId)) {
				transactionRepository.delete(item);
				status = true;
			}
		}

		return status;
	}

}
