package com.sk.wmsapi.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EtResourceNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public EtResourceNotFoundException(String message) {
        super(message);
    }
}