package com.ijse.BookStore.service.ServiceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.ijse.BookStore.Model.Book;
import com.ijse.BookStore.Repository.BookRepository;
import com.ijse.BookStore.Service.CloudinaryService;
import com.ijse.BookStore.Service.ServiceImpl.BookServiceImpl;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest
class BookServiceImplTest {

  @Autowired
  BookRepository bookRepository;

  @MockBean
  CloudinaryService cloudinaryService;

  @Autowired
  private BookServiceImpl bookService;

  @BeforeEach
  void setUp() throws IOException {
    when(cloudinaryService.uploadImage(any(MultipartFile.class)))
        .thenReturn("https://test-url.com/image.jpg");

    doNothing().when(cloudinaryService).deleteImage(anyString());
  }

  @Test
  void creatBook() throws IOException {
    String random = RandomString.make(4);
    Book book = new Book();
    book.setBookName(random);
    book.setTitle(random);
    book.setAuthor(random);
    book.setPrice(29.99);
    book.setDescription(random);

    MultipartFile image = new MockMultipartFile(
        "image",
        "test.jpg",
        "image/jpeg",
        "test image content".getBytes()
    );

    Book saved = bookService.creatBook(book, image);
    assertNotNull(saved);
    assertEquals(book.getBookName(), saved.getBookName());
    assertEquals(book.getTitle(), saved.getTitle());
    assertEquals(book.getAuthor(), saved.getAuthor());
    assertEquals(book.getPrice(), saved.getPrice());
    assertEquals(book.getDescription(), saved.getDescription());
    assertEquals(book.getCategory(), saved.getCategory());
    assertEquals(book.getSubcategory(), saved.getSubcategory());
    assertEquals("https://test-url.com/image.jpg", saved.getImage());
  }

  @Test
  void updateBook() throws IOException {
    String random = RandomString.make(4);
    Book originalBook = createRandomBook();

    Book updatedData = new Book();
    updatedData.setBookName(random);
    updatedData.setTitle(random);
    updatedData.setAuthor(random);
    updatedData.setPrice(39.99);
    updatedData.setDescription(random);

    Book updated = bookService.updateBook(originalBook.getId(), updatedData, null);
    assertNotNull(updated);
    assertEquals(updatedData.getBookName(), updated.getBookName());
    assertEquals(updatedData.getTitle(), updated.getTitle());
    assertEquals(updatedData.getAuthor(), updated.getAuthor());
    assertEquals(updatedData.getPrice(), updated.getPrice());
    assertEquals(updatedData.getDescription(), updated.getDescription());
    assertEquals(updatedData.getCategory(), updated.getCategory());
    assertEquals(updatedData.getSubcategory(), updated.getSubcategory());

    MultipartFile newImage = new MockMultipartFile(
        "image",
        "updated.jpg",
        "image/jpeg",
        "updated image content".getBytes()
    );

    originalBook.setImage("old-image-url.jpg");
    bookRepository.save(originalBook);

    Book updatedWithImage = bookService.updateBook(originalBook.getId(), updatedData, newImage);
    assertNotNull(updatedWithImage);
    assertEquals("https://test-url.com/image.jpg", updatedWithImage.getImage());
  }

  @Test
  void getAllBook() {
    Book book1 = createRandomBook();
    bookRepository.save(book1);

    Book book2 = createRandomBook();
    bookRepository.save(book2);

    List<Book> books = bookService.getAllBook();

    assertNotNull(books);
    assertTrue(books.size() >= 2);
    assertTrue(books.contains(book1));
    assertTrue(books.contains(book2));
  }

  @Test
  void getBookById() {
    Book book = createRandomBook();

    Book found = bookService.getBookById(book.getId());
    assertNotNull(found);
    assertEquals(book.getId(), found.getId());
    assertEquals(book.getBookName(), found.getBookName());

    assertThrows(NoSuchElementException.class, () -> bookService.getBookById(9999L));
  }

  @Test
  void deleteBook() {
    Book book = createRandomBook();
    bookService.deleteBook(book.getId());
    assertThrows(NoSuchElementException.class, () -> bookService.getBookById(book.getId()));

    Book bookWithImage = createRandomBook();
    bookWithImage.setImage("image-to-delete.jpg");
    bookRepository.save(bookWithImage);

    bookService.deleteBook(bookWithImage.getId());
    assertThrows(NoSuchElementException.class,
        () -> bookService.getBookById(bookWithImage.getId()));
  }

  private Book createRandomBook() {
    Book book = new Book();
    book.setBookName("Random Book " + System.currentTimeMillis());
    book.setTitle("Random Title " + System.currentTimeMillis());
    book.setAuthor("Random Author");
    book.setPrice(19.99);
    book.setDescription("Random Description");
    return bookRepository.save(book);
  }
}