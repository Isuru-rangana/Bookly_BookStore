package com.ijse.BookStore.Service;


import java.util.List;

import com.ijse.BookStore.Model.Book;
import org.springframework.stereotype.Service;



@Service
public interface BookService {
    List<Book> getAllBook();
    Book getBookById(Long Id);
    Book creatBook(Book book);
    Book updateBook(Long id, Book book);
    void deleteBook (Long id);

    
}