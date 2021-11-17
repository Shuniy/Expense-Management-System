package com.sk.wmsapi.services;

import java.util.List;

import com.sk.wmsapi.Exceptions.EtBadRequestException;
import com.sk.wmsapi.Exceptions.EtResourceNotFoundException;
import com.sk.wmsapi.models.Transaction;

public interface TransactionService {
	List<Transaction> getAllTransactions(Integer transactionId);

    Transaction getTransactionById(Integer userId, Integer transactionId) throws EtResourceNotFoundException;

    Transaction addTransaction(Transaction transaction) throws EtBadRequestException;

    Transaction updateTransaction(Integer userId, Integer transactionId, Transaction transaction) throws EtBadRequestException;

    boolean removeTransaction(Integer userId, Integer transactionId) throws EtResourceNotFoundException;
}
