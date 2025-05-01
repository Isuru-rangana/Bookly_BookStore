package com.ijse.BookStore.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ijse.BookStore.Controler.UserController;
import com.ijse.BookStore.Model.User;
import com.ijse.BookStore.Model.UserRole;
import com.ijse.BookStore.Service.UserService;
import com.ijse.BookStore.dto.LoginDTO;
import com.ijse.BookStore.dto.UserRegistrationDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false) 
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    private UserRegistrationDTO registrationDTO;
    private LoginDTO loginDTO;
    private User mockUser;

    @BeforeEach
    void setUp() {
      
        registrationDTO = new UserRegistrationDTO();
        registrationDTO.setUsername("testuser");
        registrationDTO.setPassword("password123");
        registrationDTO.setEmail("test@example.com");
        registrationDTO.setRole(UserRole.USER);

        // Setup login DTO
        loginDTO = new LoginDTO();
        loginDTO.setUsername("testuser");
        loginDTO.setPassword("password123");

        // Setup mock user
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setUsername("testuser");
        mockUser.setPassword("hashedpassword"); 
        mockUser.setEmail("test@example.com");
        mockUser.setRole(UserRole.USER);
    }
    @Test
    void registerUser_WithValidData_ShouldReturnUser() throws Exception {
      
        when(userService.registerUser(any(UserRegistrationDTO.class))).thenReturn(mockUser);

      
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registrationDTO)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    void registerUser_WithExistingUsername_ShouldReturnBadRequest() throws Exception {
     
        when(userService.registerUser(any(UserRegistrationDTO.class)))
                .thenThrow(new RuntimeException("Username already exists"));

      
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registrationDTO)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("Username already exists"));
    }

    @Test
    void registerUser_WithExistingEmail_ShouldReturnBadRequest() throws Exception {
      
        when(userService.registerUser(any(UserRegistrationDTO.class)))
                .thenThrow(new RuntimeException("Email already exists"));

       
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registrationDTO)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("Email already exists"));
    }

    @Test
    void registerUser_WithEmptyUsername_ShouldReturnBadRequest() throws Exception {
     
        when(userService.registerUser(any(UserRegistrationDTO.class)))
                .thenThrow(new RuntimeException("Username is required"));

      
        registrationDTO.setUsername("");
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registrationDTO)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("Username is required"));
    }

    @Test
    void registerUser_WithEmptyPassword_ShouldReturnBadRequest() throws Exception {
       
        when(userService.registerUser(any(UserRegistrationDTO.class)))
                .thenThrow(new RuntimeException("Password is required"));

        
        registrationDTO.setPassword("");
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registrationDTO)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("Password is required"));
    }

    @Test
    void registerUser_WithEmptyEmail_ShouldReturnBadRequest() throws Exception {
       
        when(userService.registerUser(any(UserRegistrationDTO.class)))
                .thenThrow(new RuntimeException("Email is required"));

      
        registrationDTO.setEmail("");
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registrationDTO)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("Email is required"));
    }

    @Test
    void loginUser_WithValidCredentials_ShouldReturnUser() throws Exception {
      
        when(userService.loginUser(any(LoginDTO.class))).thenReturn(mockUser);

       
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    void loginUser_WithInvalidCredentials_ShouldReturnUnauthorized() throws Exception {
       
        when(userService.loginUser(any(LoginDTO.class)))
                .thenThrow(new RuntimeException("Invalid username or password"));

      
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andDo(print())
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").value("Invalid username or password"));
    }

    @Test
    void loginUser_WithEmptyUsername_ShouldReturnUnauthorized() throws Exception {
      
        when(userService.loginUser(any(LoginDTO.class)))
                .thenThrow(new RuntimeException("Username is required"));

     
        loginDTO.setUsername("");
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andDo(print())
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").value("Username is required"));
    }

    @Test
    void loginUser_WithEmptyPassword_ShouldReturnUnauthorized() throws Exception {
     
        when(userService.loginUser(any(LoginDTO.class)))
                .thenThrow(new RuntimeException("Password is required"));

      
        loginDTO.setPassword("");
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andDo(print())
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").value("Password is required"));
    }
} 