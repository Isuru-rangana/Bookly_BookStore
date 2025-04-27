package com.ijse.BookStore.Service;

import com.ijse.BookStore.Model.Book;
import java.io.IOException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface BookService {

  List<Book> getAllBook();

  Book getBookById(Long Id);

  Book creatBook(Book book, MultipartFile image) throws IOException;

  Book updateBook(Long id, Book book, MultipartFile image) throws IOException;

  void deleteBook(Long id);
}