package com.ijse.BookStore.Repositary;

import com.ijse.BookStore.Model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository



public interface SubCategoryRepositary extends JpaRepository<SubCategory,Long> {

    
    
}
