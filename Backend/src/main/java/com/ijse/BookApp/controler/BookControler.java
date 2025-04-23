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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ijse.bookstore.Enrirty.Book;
import com.ijse.bookstore.Service.BookService;


@RestController
@CrossOrigin

public class BookControler {
    private BookService bookService;

    @Autowired
    public BookControler(BookService bookService){
        this.bookService =bookService;
    } 
    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBook(){
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getAllBook());
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id){
        try {
            Book book =bookService.getBookById(id);
            return ResponseEntity.status(HttpStatus.OK).body(book); 
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);


        }
        catch(Exception  e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @PostMapping("/books")
    public ResponseEntity<Book>creatBook(@RequestBody Book book  ){
        try {
            System.out.println(book);

            Book newBook =bookService.creatBook(book);
            return ResponseEntity.status(HttpStatus.CREATED).body(newBook);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

            
        }
    }
    @PutMapping("/books/{id}")
    public ResponseEntity<Book>updateBook(@PathVariable Long id,@RequestBody Book book){
        try {
            Book updateBook = bookService.updateBook(id, book);
            return  ResponseEntity.status(HttpStatus.OK).body(updateBook);
            
        } catch(NoSuchElementException e) {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        catch(Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void>deleteBook(@PathVariable Long id){
        try {
            bookService.deleteBook(id);
            return  ResponseEntity.status(HttpStatus.OK).body(null); 
            
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            
        }
    }



    // @GetMapping
    // public ResponseEntity<List<Book>> getBooksByCategory(@RequestParam String category) {
    //     List<Book> books = bookService.getBooksByCategory(category);
    //     return new ResponseEntity<>(books, HttpStatus.OK);
    // }







    
}
