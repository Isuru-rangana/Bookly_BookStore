package com.ijse.BookStore.service.ServiceImpl;

import com.ijse.BookStore.Model.User;
import com.ijse.BookStore.Model.UserRole;
import com.ijse.BookStore.Repository.UserRepository;
import com.ijse.BookStore.Service.ServiceImpl.UserServiceImpl;
import com.ijse.BookStore.dto.LoginDTO;
import com.ijse.BookStore.dto.UserRegistrationDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private UserRegistrationDTO validRegistrationDTO;
    private LoginDTO validLoginDTO;
    private User mockUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        
        validRegistrationDTO = new UserRegistrationDTO();
        validRegistrationDTO.setUsername("testuser");
        validRegistrationDTO.setPassword("password123");
        validRegistrationDTO.setEmail("test@example.com");
        validRegistrationDTO.setRole(UserRole.USER);

      
        validLoginDTO = new LoginDTO();
        validLoginDTO.setUsername("testuser");
        validLoginDTO.setPassword("password123");

       
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setUsername("testuser");
        mockUser.setPassword(passwordEncoder.encode("password123"));
        mockUser.setEmail("test@example.com");
        mockUser.setRole(UserRole.USER);
    }

    @Test
    void registerUser_WithValidData_ShouldRegisterSuccessfully() {
  
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

      
        User result = userService.registerUser(validRegistrationDTO);

       
        assertNotNull(result);
        assertEquals(mockUser.getId(), result.getId());
        assertEquals(mockUser.getUsername(), result.getUsername());
        assertEquals(mockUser.getEmail(), result.getEmail());
        assertEquals(mockUser.getRole(), result.getRole());

      
        verify(userRepository).existsByUsername("testuser");
        verify(userRepository).existsByEmail("test@example.com");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void registerUser_WithExistingUsername_ShouldThrowException() {
        
        when(userRepository.existsByUsername("testuser")).thenReturn(true);

       
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.registerUser(validRegistrationDTO);
        });

        assertEquals("Username already exists", exception.getMessage());
        verify(userRepository).existsByUsername("testuser");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_WithExistingEmail_ShouldThrowException() {
      
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.registerUser(validRegistrationDTO);
        });

        assertEquals("Email already exists", exception.getMessage());
        verify(userRepository).existsByUsername("testuser");
        verify(userRepository).existsByEmail("test@example.com");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_WithEmptyUsername_ShouldThrowException() {
       
        validRegistrationDTO.setUsername("");

        
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.registerUser(validRegistrationDTO);
        });

        assertEquals("Username is required", exception.getMessage());
        verify(userRepository, never()).existsByUsername(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_WithEmptyPassword_ShouldThrowException() {
        
        validRegistrationDTO.setPassword("");

      
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.registerUser(validRegistrationDTO);
        });

        assertEquals("Password is required", exception.getMessage());
        verify(userRepository, never()).existsByUsername(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_WithEmptyEmail_ShouldThrowException() {
      
        validRegistrationDTO.setEmail("");

       
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.registerUser(validRegistrationDTO);
        });

        assertEquals("Email is required", exception.getMessage());
        verify(userRepository, never()).existsByUsername(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_WithNullRole_ShouldDefaultToUserRole() {
      
        validRegistrationDTO.setRole(null);
        
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setId(1L);
            return savedUser;
        });

       
        User result = userService.registerUser(validRegistrationDTO);

       
        assertNotNull(result);
        assertEquals(UserRole.USER, result.getRole());
    }

    @Test
    void loginUser_WithValidCredentials_ShouldLoginSuccessfully() {
      
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(mockUser));

      
        User result = userService.loginUser(validLoginDTO);

        
        assertNotNull(result);
        assertEquals(mockUser.getId(), result.getId());
        assertEquals(mockUser.getUsername(), result.getUsername());
        assertEquals(mockUser.getEmail(), result.getEmail());
        assertEquals(mockUser.getRole(), result.getRole());

      
        verify(userRepository).findByUsername("testuser");
    }

    @Test
    void loginUser_WithInvalidUsername_ShouldThrowException() {
       
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.loginUser(validLoginDTO);
        });

        assertEquals("Invalid username or password", exception.getMessage());
        verify(userRepository).findByUsername("testuser");
    }

    @Test
    void loginUser_WithInvalidPassword_ShouldThrowException() {
        
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(mockUser));
        validLoginDTO.setPassword("wrongpassword");

        
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.loginUser(validLoginDTO);
        });

        assertEquals("Invalid username or password", exception.getMessage());
        verify(userRepository).findByUsername("testuser");
    }

    @Test
    void loginUser_WithEmptyUsername_ShouldThrowException() {
      
        validLoginDTO.setUsername("");

      
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.loginUser(validLoginDTO);
        });

        assertEquals("Username is required", exception.getMessage());
        verify(userRepository, never()).findByUsername(anyString());
    }

    @Test
    void loginUser_WithEmptyPassword_ShouldThrowException() {
      
        validLoginDTO.setPassword("");

      
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.loginUser(validLoginDTO);
        });

        assertEquals("Password is required", exception.getMessage());
        verify(userRepository, never()).findByUsername(anyString());
    }
} 