package com.ijse.BookStore.Repositary;

import com.ijse.BookStore.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface CategoryRepositary extends JpaRepository<Category, Long> {
    
}
