package com.sk.wmsapi.services;

import com.sk.wmsapi.Exceptions.EtAuthException;
import com.sk.wmsapi.models.User;

public interface UserService {
 	public User getUserById(Integer id);
	public User validateUser(String email, String password) throws EtAuthException;
	public User registerUser(String email, String firstName, String lastName, String password)  throws EtAuthException;
	
}
