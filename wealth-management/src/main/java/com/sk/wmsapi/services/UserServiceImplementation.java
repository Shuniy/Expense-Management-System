package com.sk.wmsapi.services;

import java.util.Optional;
import java.util.regex.Pattern;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sk.wmsapi.Exceptions.EtAuthException;
import com.sk.wmsapi.models.User;
import com.sk.wmsapi.repositories.UserRepository;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	UserRepository userRepository;

	public Integer getCountByEmail(String email) {
		List<User> allUsers = userRepository.findAll();
		Integer count = 0;
		for (User user : allUsers) {
			if (user.getEmail().toLowerCase().equals(email.toLowerCase())) {
				count++;
			}
		}
		return count;
	}

	public User registerUser(String email, String firstName, String lastName, String password) throws EtAuthException {
		Pattern pattern = Pattern.compile("^(.+)@(.+)$");

		email = email.toLowerCase();

		if (!pattern.matcher(email).matches()) {
			throw new EtAuthException("Invalid email format");
		}

		Integer count = getCountByEmail(email);
		if (count > 0) {
			throw new EtAuthException("Email already in use");
		}
		User user = new User();
		user.setEmail(email);
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setPassword(password);
		return userRepository.save(user);
	}

	public User getUserById(Integer id) {
		Optional<User> findById = userRepository.findById(id);
		return findById.isPresent() ? findById.get() : null;
	}

	public User validateUser(String email, String password) throws EtAuthException {

		if (email != null) {
			email = email.toLowerCase();
		}

		List<User> users = userRepository.findAll();

		for (User other : users) {
			if (other == null || other.getEmail() == null || other.getPassword() == null) {
				continue;
			}
			if (other.getEmail().toLowerCase().equals(email.toLowerCase())) {
				if (other.getPassword().equals(password)) {
					return other;
				} else {
					return null;
				}
			}
		}

		return null;
	}

}
