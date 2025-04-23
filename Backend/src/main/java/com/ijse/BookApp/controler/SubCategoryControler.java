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

import com.ijse.bookstore.Enrirty.SubCategory;
import com.ijse.bookstore.Service.SubCategoryService;




@RestController
@CrossOrigin

public class SubCategoryControler {
    private SubCategoryService subcategoryService;

    @Autowired
    public SubCategoryControler(SubCategoryService subcategoryService){
        this.subcategoryService = subcategoryService;
    }

    @GetMapping("/subcategores")
    public ResponseEntity<List<SubCategory>> getAllSubCategory(){
        return ResponseEntity.status(HttpStatus.OK).body(subcategoryService.getAllSubCategory());


    }
    @GetMapping("/subcategores/{id}")
    public ResponseEntity<SubCategory> getSubCategoryById(@PathVariable Long id){
        try {
            SubCategory subcategory = subcategoryService.getSubCategoryById(id);
            return ResponseEntity.status(HttpStatus.OK).body(subcategory);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/subcategores")
    public ResponseEntity<SubCategory>creatSubCategory(@RequestBody SubCategory subcategory){
        try {
            SubCategory newSubCategory = subcategoryService.CreatSubCategory(subcategory);
            return ResponseEntity.status(HttpStatus.CREATED).body(newSubCategory);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

          
        }
    }
      @PutMapping("/subcategores/{id}")
    public ResponseEntity<SubCategory>updatSubCategory(@PathVariable Long id,@RequestBody SubCategory subcategory){
        try {
            SubCategory updateSubCategory = subcategoryService.updateSubCategory(id,subcategory);
            return  ResponseEntity.status(HttpStatus.OK).body(updateSubCategory);
            
        } catch(NoSuchElementException e) {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        catch(Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }
       @DeleteMapping("/subcategores/{id}")
    public ResponseEntity<Void>deleteSubCategory(@PathVariable Long id){
        try {
            subcategoryService.deleteSubCategory(id);
            return  ResponseEntity.status(HttpStatus.OK).body(null); 
            
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            
        }
    }

    



    
}
