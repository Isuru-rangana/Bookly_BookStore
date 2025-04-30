package com.ijse.BookStore.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ijse.BookStore.Model.Category;
import com.ijse.BookStore.Model.SubCategory;
import com.ijse.BookStore.Service.SubCategoryService;
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
public class SubCategoryControlerTest {
    private final String BASE_URL = "/subcategores";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SubCategoryService subCategoryService;

    private SubCategory subCategory;
    private Category category;

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setId(1L);
        category.setCname("Test Category");
        category.setCdescription("Test Category Description");

        subCategory = new SubCategory();
        subCategory.setId(1L);
        subCategory.setSbname("Test SubCategory");
        subCategory.setSbdescription("Test SubCategory Description");
        subCategory.setCategory(category);
    }

    @Test
    void getAllSubCategory() throws Exception {
        List<SubCategory> subCategories = Arrays.asList(subCategory);
        Mockito.when(subCategoryService.getAllSubCategory()).thenReturn(subCategories);

        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(subCategory.getId()))
                .andExpect(jsonPath("$[0].sbname").value(subCategory.getSbname()));
    }

    @Test
    void getSubCategoryById_found() throws Exception {
        Mockito.when(subCategoryService.getSubCategoryById(1L)).thenReturn(subCategory);

        mockMvc.perform(get(BASE_URL + "/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(subCategory.getId()))
                .andExpect(jsonPath("$.sbname").value(subCategory.getSbname()));
    }

    @Test
    void getSubCategoryById_notFound() throws Exception {
        Mockito.when(subCategoryService.getSubCategoryById(anyLong())).thenThrow(new NoSuchElementException());

        mockMvc.perform(get(BASE_URL + "/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void createSubCategory() throws Exception {
        Mockito.when(subCategoryService.CreatSubCategory(any(SubCategory.class))).thenReturn(subCategory);

        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(subCategory)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(subCategory.getId()))
                .andExpect(jsonPath("$.sbname").value(subCategory.getSbname()));
    }

    @Test
    void updateSubCategory() throws Exception {
        Mockito.when(subCategoryService.updateSubCategory(anyLong(), any(SubCategory.class))).thenReturn(subCategory);

        mockMvc.perform(put(BASE_URL + "/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(subCategory)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(subCategory.getId()))
                .andExpect(jsonPath("$.sbname").value(subCategory.getSbname()));
    }

    @Test
    void updateSubCategory_notFound() throws Exception {
        Mockito.when(subCategoryService.updateSubCategory(anyLong(), any(SubCategory.class))).thenThrow(new NoSuchElementException());

        mockMvc.perform(put(BASE_URL + "/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(subCategory)))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteSubCategory() throws Exception {
        Mockito.doNothing().when(subCategoryService).deleteSubCategory(1L);

        mockMvc.perform(delete(BASE_URL + "/1"))
                .andExpect(status().isOk());
    }
} 