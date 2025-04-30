package com.ijse.BookStore.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ijse.BookStore.Model.Category;
import com.ijse.BookStore.Service.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CategoryControllerTest {
    private final String BASE_URL = "/categores";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CategoryService categoryService;

    private Category category;

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setId(1L);
        category.setCname("Test Category");
        category.setCdescription("Test Category Description");
    }

    @Test
    void getAllCategory() throws Exception {
        List<Category> categories = Arrays.asList(category);
        Mockito.when(categoryService.getAllCategory()).thenReturn(categories);

        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(category.getId()))
                .andExpect(jsonPath("$[0].cname").value(category.getCname()))
                .andExpect(jsonPath("$[0].cdescription").value(category.getCdescription()));
    }

    @Test
    void getCategoryById_found() throws Exception {
        Mockito.when(categoryService.getCategoryById(1L)).thenReturn(category);

        mockMvc.perform(get(BASE_URL + "/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(category.getId()))
                .andExpect(jsonPath("$.cname").value(category.getCname()))
                .andExpect(jsonPath("$.cdescription").value(category.getCdescription()));
    }

    @Test
    void getCategoryById_notFound() throws Exception {
        Mockito.when(categoryService.getCategoryById(anyLong())).thenThrow(new NoSuchElementException());

        mockMvc.perform(get(BASE_URL + "/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getCategoryById_serverError() throws Exception {
        Mockito.when(categoryService.getCategoryById(anyLong())).thenThrow(new RuntimeException("Test exception"));

        mockMvc.perform(get(BASE_URL + "/1"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void createCategory() throws Exception {
        Mockito.when(categoryService.CreatCategory(any(Category.class))).thenReturn(category);

        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(category)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(category.getId()))
                .andExpect(jsonPath("$.cname").value(category.getCname()))
                .andExpect(jsonPath("$.cdescription").value(category.getCdescription()));
    }

    @Test
    void createCategory_serverError() throws Exception {
        Mockito.when(categoryService.CreatCategory(any(Category.class))).thenThrow(new RuntimeException("Test exception"));

        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(category)))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void updateCategory() throws Exception {
        Mockito.when(categoryService.updateCategory(anyLong(), any(Category.class))).thenReturn(category);

        mockMvc.perform(put(BASE_URL + "/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(category)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(category.getId()))
                .andExpect(jsonPath("$.cname").value(category.getCname()))
                .andExpect(jsonPath("$.cdescription").value(category.getCdescription()));
    }

    @Test
    void updateCategory_notFound() throws Exception {
        Mockito.when(categoryService.updateCategory(anyLong(), any(Category.class))).thenThrow(new NoSuchElementException());

        mockMvc.perform(put(BASE_URL + "/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(category)))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateCategory_serverError() throws Exception {
        Mockito.when(categoryService.updateCategory(anyLong(), any(Category.class))).thenThrow(new RuntimeException("Test exception"));

        mockMvc.perform(put(BASE_URL + "/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(category)))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void deleteCategory() throws Exception {
        Mockito.doNothing().when(categoryService).deleteCategory(1L);

        mockMvc.perform(delete(BASE_URL + "/1"))
                .andExpect(status().isOk());
    }

    @Test
    void deleteCategory_serverError() throws Exception {
        Mockito.doThrow(new RuntimeException("Test exception")).when(categoryService).deleteCategory(1L);

        mockMvc.perform(delete(BASE_URL + "/1"))
                .andExpect(status().isInternalServerError());
    }
} 