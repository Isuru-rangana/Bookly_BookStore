package com.ijse.BookStore.Service.ServiceImpl;

import com.ijse.BookStore.Model.Book;
import com.ijse.BookStore.Repository.BookRepository;
import com.ijse.BookStore.Service.BookService;
import com.ijse.BookStore.Service.CloudinaryService;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {

  private final BookRepository bookRepository;
  private final CloudinaryService cloudinaryService;


  @Override
  public List<Book> getAllBook() {
    return bookRepository.findAll();
  }

  @Override
  public Book getBookById(Long id) {
    return bookRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Book not found with id: " + id));
  }

  @Override
  public Book creatBook(Book book, MultipartFile image) throws IOException {
    if (image != null && !image.isEmpty()) {
      String imageUrl = cloudinaryService.uploadImage(image);
      book.setImage(imageUrl);
    }
    return bookRepository.save(book);
  }

  @Override
  public Book updateBook(Long id, Book book, MultipartFile image) throws IOException {
    Book existingBook = getBookById(id);

    existingBook.setBookName(book.getBookName());
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

    return bookRepository.save(existingBook);
  }

  @Override
  public void deleteBook(Long id) {
    Book book = getBookById(id);
    if (book.getImage() != null && !book.getImage().isEmpty()) {
      cloudinaryService.deleteImage(book.getImage());
    }
    bookRepository.deleteById(id);
  }
}
