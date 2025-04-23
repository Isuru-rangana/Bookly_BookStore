package com.ijse.bookstore.Repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ijse.bookstore.Enrirty.Category;


@Repository

public interface CategoryRepositary extends JpaRepository<Category, Long> {
    
}
