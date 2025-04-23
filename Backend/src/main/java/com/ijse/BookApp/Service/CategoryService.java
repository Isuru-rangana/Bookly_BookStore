package com.ijse.bookstore.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ijse.bookstore.Enrirty.Category;


@Service


public interface CategoryService {
    List<Category> getAllCategory();
    Category getCategoryById(Long id);
    Category CreatCategory( Category category);
    Category updateCategory (Long id, Category category);
    void deleteCategory(Long id);    
}
