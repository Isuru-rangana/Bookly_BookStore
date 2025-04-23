package com.ijse.BookStore.Service;

import com.ijse.BookStore.Model.User;
import com.ijse.BookStore.dto.LoginDTO;
import com.ijse.BookStore.dto.UserRegistrationDTO;

public interface UserService {
    User registerUser(UserRegistrationDTO registrationDTO);
    User loginUser(LoginDTO loginDTO);
} 