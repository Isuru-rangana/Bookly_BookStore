package com.ijse.bookstore.Repositary;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ijse.bookstore.Enrirty.Book;


@Repository

public interface BookRepositary extends JpaRepository<Book,Long> {

    
}
