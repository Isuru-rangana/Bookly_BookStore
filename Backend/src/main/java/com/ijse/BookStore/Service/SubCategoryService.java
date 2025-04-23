package com.ijse.BookStore.Service;

import java.util.List;

import com.ijse.BookStore.Model.SubCategory;
import org.springframework.stereotype.Service;
@Service
public interface SubCategoryService {
    List<SubCategory> getAllSubCategory();
    SubCategory getSubCategoryById(Long id);
    SubCategory CreatSubCategory( SubCategory subcategory);
    SubCategory updateSubCategory (Long id, SubCategory subcategory);
    void deleteSubCategory(Long id);    
}
