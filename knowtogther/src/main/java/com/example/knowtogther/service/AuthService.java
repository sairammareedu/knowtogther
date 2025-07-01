package com.example.knowtogther.service;

import com.example.knowtogther.model.User;
import com.example.knowtogther.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository repo;

    public String register(User user) {
        Optional<User> existing = Optional.ofNullable(repo.findByEmail(user.getEmail()));
        if (existing.isPresent()) return "User already exists";
        repo.save(user);
        return "User registered successfully";
    }

    public String login(String email, String password) {
        Optional<User> user = Optional.ofNullable(repo.findByEmail(email));
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return "Login successful";
        }
        return "Invalid credentials";
    }
}
