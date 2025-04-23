package com.ijse.BookStore.Repositary;

import com.ijse.BookStore.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface BookRepositary extends JpaRepository<Book,Long> {

    
}
