package com.ijse.BookStore.Service.ServiceImpl;
import java.util.List;
import java.util.NoSuchElementException;


import com.ijse.BookStore.Model.Book;
import com.ijse.BookStore.Repositary.BookRepositary;
import com.ijse.BookStore.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service

public class BookServiceImpl implements BookService {
    private BookRepositary bookRepositary;

    @Autowired
    public BookServiceImpl(BookRepositary bookRepositary){
        this.bookRepositary = bookRepositary;


    }

    @Override 
    public List<Book> getAllBook(){
        return bookRepositary.findAll();
    }

    
    @Override
    public Book getBookById(Long id){
        return bookRepositary.findById(id).orElseThrow(() -> new NoSuchElementException("User not fond"+id));
    }
    @Override
    public Book creatBook (Book book){
        return bookRepositary.save(book);
        
    }

    @Override
    public Book updateBook (Long id, Book book){
        Book existingBook = getBookById(id);
        existingBook.setBookname(book.getBookname());
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setPrice(book.getPrice());
        existingBook.setDescription(book.getDescription());

         
        return bookRepositary.save(existingBook);

    } 

    @Override 
    public void deleteBook(Long id){
        bookRepositary.deleteById(id);
    }

}
