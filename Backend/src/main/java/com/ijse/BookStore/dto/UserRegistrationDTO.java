package com.ijse.BookStore.dto;

import com.ijse.BookStore.Model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
    private String username;
    private String password;
    private String email;
    private UserRole role;
} 