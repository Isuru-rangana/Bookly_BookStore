package com.ijse.BookStore.service.ServiceImpl;

import com.ijse.BookStore.Model.Category;
import com.ijse.BookStore.Repository.CategoryRepository;
import com.ijse.BookStore.Service.ServiceImpl.CategoryServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CategoryServiceImplTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryServiceImpl categoryService;

    @BeforeEach
    void setUp() {
        categoryRepository.deleteAll();
    }

    @Test
    void createCategory() {
        Category category = new Category();
        category.setCname("Test Category");
        category.setCdescription("Test Description");

        Category saved = categoryService.CreatCategory(category);
        assertNotNull(saved.getId());
        assertEquals(category.getCname(), saved.getCname());
        assertEquals(category.getCdescription(), saved.getCdescription());
    }

    @Test
    void updateCategory() {
        Category category = new Category();
        category.setCname("Original Name");
        category.setCdescription("Original Description");
        Category saved = categoryService.CreatCategory(category);

        Category update = new Category();
        update.setCname("Updated Name");
        update.setCdescription("Updated Description");

        Category updated = categoryService.updateCategory(saved.getId(), update);
        assertEquals("Updated Name", updated.getCname());
        assertEquals("Updated Description", updated.getCdescription());
    }

    @Test
    void getAllCategory() {
        Category category1 = new Category();
        category1.setCname("Cat1");
        category1.setCdescription("Desc1");
        categoryService.CreatCategory(category1);

        Category category2 = new Category();
        category2.setCname("Cat2");
        category2.setCdescription("Desc2");
        categoryService.CreatCategory(category2);

        List<Category> categories = categoryService.getAllCategory();
        assertNotNull(categories);
        assertTrue(categories.size() >= 2);
    }

    @Test
    void getCategoryById() {
        Category category = new Category();
        category.setCname("Find Me");
        category.setCdescription("Find Desc");
        Category saved = categoryService.CreatCategory(category);

        Category found = categoryService.getCategoryById(saved.getId());
        assertNotNull(found);
        assertEquals(saved.getId(), found.getId());
        assertEquals(saved.getCname(), found.getCname());

        assertThrows(NoSuchElementException.class, () -> categoryService.getCategoryById(99999L));
    }

    @Test
    void deleteCategory() {
        Category category = new Category();
        category.setCname("Delete Me");
        category.setCdescription("Delete Desc");
        Category saved = categoryService.CreatCategory(category);

        categoryService.deleteCategory(saved.getId());
        assertThrows(NoSuchElementException.class, () -> categoryService.getCategoryById(saved.getId()));
    }
} 