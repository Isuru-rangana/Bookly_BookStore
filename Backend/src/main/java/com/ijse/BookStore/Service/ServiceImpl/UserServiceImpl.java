package com.ijse.BookStore.Service.ServiceImpl;

import com.ijse.BookStore.Model.User;
import com.ijse.BookStore.Model.UserRole;
import com.ijse.BookStore.Repository.UserRepository;
import com.ijse.BookStore.Service.UserService;
import com.ijse.BookStore.dto.LoginDTO;
import com.ijse.BookStore.dto.UserRegistrationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User registerUser(UserRegistrationDTO registrationDTO) {
        if (registrationDTO.getUsername() == null || registrationDTO.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }
        if (registrationDTO.getPassword() == null || registrationDTO.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }
        if (registrationDTO.getEmail() == null || registrationDTO.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (userRepository.existsByUsername(registrationDTO.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(registrationDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(registrationDTO.getUsername().trim());
        user.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setEmail(registrationDTO.getEmail().trim().toLowerCase());
        
        // Set the role from the DTO, defaulting to USER if not specified
        user.setRole(registrationDTO.getRole() != null ? registrationDTO.getRole() : UserRole.USER);

        return userRepository.save(user);
    }

    @Override
    public User loginUser(LoginDTO loginDTO) {
        if (loginDTO.getUsername() == null || loginDTO.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }
        if (loginDTO.getPassword() == null || loginDTO.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return user;
    }
} 