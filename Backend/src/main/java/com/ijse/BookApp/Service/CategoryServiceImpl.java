package com.ijse.bookstore.Service;

import java.util.List;
import java.util.NoSuchElementException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.bookstore.Enrirty.Category;
import com.ijse.bookstore.Repositary.CategoryRepositary;


@Service



public class CategoryServiceImpl implements CategoryService {
    private CategoryRepositary categoryRepositary;

      @Autowired
    public CategoryServiceImpl(CategoryRepositary categoryRepositary){
        this.categoryRepositary = categoryRepositary;


    }

    @Override 
    public List<Category> getAllCategory(){
        return categoryRepositary.findAll();
    }

    
    @Override
    public Category getCategoryById(Long id){
        return categoryRepositary.findById(id).orElseThrow(() -> new NoSuchElementException("User not fond"+id));
    }
    @Override
    public Category CreatCategory(Category category){
        return categoryRepositary.save(category);
        
    }

    @Override
    public Category updateCategory (Long id, Category category){
        Category existingCategory = getCategoryById(id);
        existingCategory.setCname(category.getCname());
        existingCategory.setCdescription(category.getCdescription());
        
         
        return categoryRepositary.save(existingCategory);

    } 

    @Override 
    public void deleteCategory(Long id){
        categoryRepositary.deleteById(id);
    }
    
}
