package com.ijse.BookStore.Service.ServiceImpl;

import com.ijse.BookStore.Model.SubCategory;
import com.ijse.BookStore.Repository.SubCategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class SubCategoryServiceImplTest {
    @Mock
    private SubCategoryRepository subCategoryRepository;

    @InjectMocks
    private SubCategoryServiceImpl subCategoryService;

    private SubCategory subCategory;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        subCategory = new SubCategory();
        subCategory.setId(1L);
        subCategory.setSbname("Test SubCategory");
        subCategory.setSbdescription("Test Description");
    }

    @Test
    void getAllSubCategory_returnsList() {
        when(subCategoryRepository.findAll()).thenReturn(Arrays.asList(subCategory));
        List<SubCategory> result = subCategoryService.getAllSubCategory();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(subCategory.getId(), result.get(0).getId());
    }

    @Test
    void getSubCategoryById_found() {
        when(subCategoryRepository.findById(1L)).thenReturn(Optional.of(subCategory));
        SubCategory result = subCategoryService.getSubCategoryById(1L);
        assertNotNull(result);
        assertEquals(subCategory.getId(), result.getId());
    }

    @Test
    void getSubCategoryById_notFound_throwsException() {
        when(subCategoryRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> subCategoryService.getSubCategoryById(99L));
    }

    @Test
    void creatSubCategory_savesAndReturns() {
        when(subCategoryRepository.save(any(SubCategory.class))).thenReturn(subCategory);
        SubCategory result = subCategoryService.CreatSubCategory(subCategory);
        assertNotNull(result);
        assertEquals(subCategory.getSbname(), result.getSbname());
    }

    @Test
    void updateSubCategory_updatesAndReturns() {
        SubCategory updated = new SubCategory();
        updated.setSbname("Updated Name");
        updated.setSbdescription("Updated Description");
        when(subCategoryRepository.findById(1L)).thenReturn(Optional.of(subCategory));
        when(subCategoryRepository.save(any(SubCategory.class))).thenReturn(subCategory);
        SubCategory result = subCategoryService.updateSubCategory(1L, updated);
        assertNotNull(result);
        verify(subCategoryRepository).save(subCategory);
    }

    @Test
    void deleteSubCategory_deletesById() {
        doNothing().when(subCategoryRepository).deleteById(1L);
        subCategoryService.deleteSubCategory(1L);
        verify(subCategoryRepository, times(1)).deleteById(1L);
    }
} 