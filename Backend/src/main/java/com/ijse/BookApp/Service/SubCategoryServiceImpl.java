package com.ijse.bookstore.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.bookstore.Enrirty.SubCategory;
import com.ijse.bookstore.Repositary.SubCategoryRepositary;




@Service
public class SubCategoryServiceImpl implements SubCategoryService {
    private SubCategoryRepositary subcategoryRepositary;

    @Autowired
    public SubCategoryServiceImpl(SubCategoryRepositary subcategoryRepositary) {
        this.subcategoryRepositary = subcategoryRepositary;
    }
    


    

    @Override
    public List<SubCategory> getAllSubCategory() {
        return subcategoryRepositary.findAll();
    }
    

    
    @Override
    public SubCategory getSubCategoryById(Long id){
        return subcategoryRepositary.findById(id).orElseThrow(() -> new NoSuchElementException("User not fond"+id));
    }
    @Override
    public SubCategory CreatSubCategory(SubCategory subcategory){
        return subcategoryRepositary.save(subcategory);
        
    }

    @Override
    public SubCategory updateSubCategory (Long id, SubCategory subcategory){
        SubCategory existingSubCategory = getSubCategoryById(id);
        existingSubCategory.setSbname(subcategory.getSbname());
        existingSubCategory.setSbdescription(subcategory.getSbdescription());
        
         
        return subcategoryRepositary.save(existingSubCategory);

    } 

    @Override 
    public void deleteSubCategory(Long id){
        subcategoryRepositary.deleteById(id);
    }
    
}
