package com.ijse.BookStore.Service.ServiceImpl;
import java.util.List;
import java.util.NoSuchElementException;
import java.io.IOException;

import com.ijse.BookStore.Model.Book;
import com.ijse.BookStore.Repositary.BookRepositary;
import com.ijse.BookStore.Service.BookService;
import com.ijse.BookStore.Service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepositary bookRepositary;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public BookServiceImpl(BookRepositary bookRepositary, CloudinaryService cloudinaryService) {
        this.bookRepositary = bookRepositary;
        this.cloudinaryService = cloudinaryService;
    }

    @Override 
    public List<Book> getAllBook() {
        return bookRepositary.findAll();
    }

    @Override
    public Book getBookById(Long id) {
        return bookRepositary.findById(id).orElseThrow(() -> new NoSuchElementException("Book not found with id: " + id));
    }

    @Override
    public Book creatBook(Book book, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image);
            book.setImage(imageUrl);
        }
        return bookRepositary.save(book);
    }

    @Override
    public Book updateBook(Long id, Book book, MultipartFile image) throws IOException {
        Book existingBook = getBookById(id);
        
        // Update basic fields
        existingBook.setBookname(book.getBookname());
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setPrice(book.getPrice());
        existingBook.setDescription(book.getDescription());
        existingBook.setCategory(book.getCategory());
        existingBook.setSubcategory(book.getSubcategory());

        if (image != null && !image.isEmpty()) {
            if (existingBook.getImage() != null && !existingBook.getImage().isEmpty()) {
                cloudinaryService.deleteImage(existingBook.getImage());
            }
            String imageUrl = cloudinaryService.uploadImage(image);
            existingBook.setImage(imageUrl);
        }
         
        return bookRepositary.save(existingBook);
    } 

    @Override 
    public void deleteBook(Long id) {
        Book book = getBookById(id);
        // Delete image from Cloudinary if exists
        if (book.getImage() != null && !book.getImage().isEmpty()) {
            cloudinaryService.deleteImage(book.getImage());
        }
        bookRepositary.deleteById(id);
    }
}
