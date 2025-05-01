package com.ijse.BookStore.Controler;

import com.ijse.BookStore.Model.Book;
import com.ijse.BookStore.Service.BookService;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")  // Allow all origins for testing
@RequestMapping("/books")
@AllArgsConstructor
public class BookController {

  private static final Logger logger = LoggerFactory.getLogger(BookController.class);
  private final BookService bookService;

  @GetMapping("")
  public List<Book> getAllBook() {
    return bookService.getAllBook();
  }

  @GetMapping("/{id}")
  public Book findById(@PathVariable Long id) {
    return bookService.getBookById(id);
  }

  @PostMapping("")
  public ResponseEntity<Book> creatBook(
      @RequestParam(value = "image", required = true) MultipartFile image,
      @RequestParam(value = "bookName", required = true) String bookName,
      @RequestParam(value = "title", required = true) String title,
      @RequestParam(value = "author", required = true) String author,
      @RequestParam(value = "price", required = true) double price,
      @RequestParam(value = "description", required = true) String description,
      @RequestParam(value = "category", required = false) Long categoryId,
      @RequestParam(value = "subcategory", required = false) Long subcategoryId) {
    try {
      logger.info("Creating book: bookName={}, title={}, author={}, price={}", 
                 bookName, title, author, price);
      
      Book book = new Book();
      book.setBookName(bookName);
      book.setTitle(title);
      book.setAuthor(author);
      book.setPrice(price);
      book.setDescription(description);

      Book newBook = bookService.creatBook(book, image);
      logger.info("Book created successfully with ID: {}", newBook.getId());
      return ResponseEntity.status(HttpStatus.CREATED).body(newBook);
    } catch (IOException e) {
      logger.error("IO Exception when creating book: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    } catch (Exception e) {
      logger.error("Exception when creating book: {}", e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Book> updateBook(
      @PathVariable Long id,
      @RequestParam(value = "image", required = false) MultipartFile image,
      @RequestParam("bookName") String bookName,
      @RequestParam("title") String title,
      @RequestParam("author") String author,
      @RequestParam("price") double price,
      @RequestParam("description") String description,
      @RequestParam(value = "category", required = false) Long categoryId,
      @RequestParam(value = "subcategory", required = false) Long subcategoryId) {
    try {
      Book book = new Book();
      book.setBookName(bookName);
      book.setTitle(title);
      book.setAuthor(author);
      book.setPrice(price);
      book.setDescription(description);

      Book updatedBook = bookService.updateBook(id, book, image);
      return ResponseEntity.status(HttpStatus.OK).body(updatedBook);
    } catch (NoSuchElementException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteBook(@PathVariable Long id) {
    bookService.deleteBook(id);
  }
}
