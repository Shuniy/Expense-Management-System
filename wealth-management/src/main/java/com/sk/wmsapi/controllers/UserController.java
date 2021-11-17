package com.sk.wmsapi.controllers;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sk.wmsapi.Constants;
import com.sk.wmsapi.Exceptions.EtAuthException;
import com.sk.wmsapi.Exceptions.EtBadRequestException;
import com.sk.wmsapi.Exceptions.EtResourceNotFoundException;
import com.sk.wmsapi.models.User;
import com.sk.wmsapi.services.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/api/users/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/check")
	public String check() {
		return "ok";
	}
	
	private String generateJWTToken(User user) {
        long timestamp = System.currentTimeMillis();
        return Jwts.builder().signWith(SignatureAlgorithm.HS256, Constants.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + Constants.TOKEN_VALIDITY))
                .claim("userId", user.getUserId())
                .claim("email", user.getEmail())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .compact();
    }
	
	@GetMapping("/getClaims")
	public ResponseEntity<User> getClaim(@RequestHeader(name="Authorization") String token) {
		Claims claims = Jwts.parser().setSigningKey(Constants.API_SECRET_KEY).parseClaimsJws(token.substring(7)).getBody();
		User user = new User();
		user.setEmail(claims.get("email").toString());
		user.setFirstName(claims.get("firstName").toString());
		user.setLastName(claims.get("lastName").toString());
		user.setUserId(Integer.parseInt(claims.get("userId").toString()));
		
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody Map<String, Object> data) throws EtBadRequestException, EtAuthException {
		
		String firstName = (String) data.get("firstName");
        String lastName = (String) data.get("lastName");
        String email = (String) data.get("email");
        String password = (String) data.get("password");
		
		User savedUser = userService.registerUser(email, firstName, lastName, password);
		return new ResponseEntity<>(generateJWTToken(savedUser), HttpStatus.OK);
	}
	
	@GetMapping("/getUser/{id}")
	public String getUserById(@PathVariable Integer id) throws EtResourceNotFoundException {
		return userService.getUserById(id).toString();
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> loginUser(@RequestBody Map<String, Object> data) throws EtResourceNotFoundException {
		String email = (String) data.get("email");
        String password = (String) data.get("password");
        User user = userService.validateUser(email, password);
        if (user == null) {
			return new ResponseEntity<>("User not Found!", HttpStatus.NOT_FOUND);
		}
        return new ResponseEntity<>(generateJWTToken(user), HttpStatus.OK);
	}
	
}
