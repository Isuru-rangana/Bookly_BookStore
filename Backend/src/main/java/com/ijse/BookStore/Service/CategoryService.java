package com.ijse.BookStore.Service;

import com.ijse.BookStore.Model.Category;
import org.springframework.stereotype.Service;

import java.util.List;


@Service


public interface CategoryService {
    List<Category> getAllCategory();
    Category getCategoryById(Long id);
    Category CreatCategory( Category category);
    Category updateCategory (Long id, Category category);
    void deleteCategory(Long id);    
}
