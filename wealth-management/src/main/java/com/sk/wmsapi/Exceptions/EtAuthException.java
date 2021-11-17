package com.sk.wmsapi.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class EtAuthException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public EtAuthException(String message) {
        super(message);
    }
}