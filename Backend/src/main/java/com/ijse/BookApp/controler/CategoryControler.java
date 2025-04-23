package com.ijse.bookstore.Controler;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ijse.bookstore.Enrirty.Category;
import com.ijse.bookstore.Service.CategoryService;



@RestController
@CrossOrigin

public class CategoryControler {
    private CategoryService categoryService;

    @Autowired
    public CategoryControler(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @GetMapping("/categores")
    public ResponseEntity<List<Category>> getAllCategory(){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllCategory());


    }
    @GetMapping("/categores/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id){
        try {
            Category category = categoryService.getCategoryById(id);
            return ResponseEntity.status(HttpStatus.OK).body(category);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/categores")
    public ResponseEntity<Category>creatCategory(@RequestBody Category category){
        try {
            Category newCategory = categoryService.CreatCategory(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
          
        }
    }
      @PutMapping("/categores/{id}")
    public ResponseEntity<Category>updatCategory(@PathVariable Long id,@RequestBody Category category){
        try {
            Category updateCategory = categoryService.updateCategory(id,category);
            return  ResponseEntity.status(HttpStatus.OK).body(updateCategory);
            
        } catch(NoSuchElementException e) {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        catch(Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }
       @DeleteMapping("/categores/{id}")
    public ResponseEntity<Void>deleteCategory(@PathVariable Long id){
        try {
            categoryService.deleteCategory(id);
            return  ResponseEntity.status(HttpStatus.OK).body(null); 
            
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            
        }
    }

    



    
}
