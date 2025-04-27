package com.ijse.BookStore.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ijse.BookStore.Model.Book;
import com.ijse.BookStore.Service.BookService;
import com.ijse.BookStore.Service.CloudinaryService;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest
@AutoConfigureMockMvc
public class BookControllerTest {

  private final String BASE_URL = "/books";
  private Book randomBook;
  private boolean initialized = false;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private BookService bookService;

  @MockBean
  private CloudinaryService cloudinaryService;

  @BeforeEach
  public void setUp() throws Exception {
    when(cloudinaryService.uploadImage(any(MultipartFile.class)))
        .thenReturn("https://test-url.com/image.jpg");

    doNothing().when(cloudinaryService).deleteImage(anyString());

    if (initialized) {
      return;
    }
    var book = new Book();
    book.setBookName("Test Book " + RandomString.make(6));
    book.setTitle("Test Title");
    book.setAuthor("Test Author");
    book.setPrice(100.0);
    book.setDescription("Test Description");

    randomBook = bookService.creatBook(book, null);
    initialized = true;
  }

  @Test
  void findAll() throws Exception {
    mockMvc.perform(get(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("*").isNotEmpty());
  }

  @Test
  void findById() throws Exception {
    mockMvc.perform(get(BASE_URL + "/" + randomBook.getId())
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(randomBook.getId()));
  }

  @Test
  void create() throws Exception {
    MockMultipartFile image = new MockMultipartFile(
        "image",
        "test.jpg",
        MediaType.IMAGE_JPEG_VALUE,
        "test image content".getBytes()
    );

    mockMvc.perform(multipart(BASE_URL)
            .file(image)
            .param("bookName", "New Book")
            .param("title", "New Title")
            .param("author", "New Author")
            .param("price", "150.0")
            .param("description", "New Description"))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.bookName").value("New Book"));
  }

  @Test
  void update() throws Exception {
    MockMultipartFile image = new MockMultipartFile(
        "image",
        "update.jpg",
        MediaType.IMAGE_JPEG_VALUE,
        "updated image content".getBytes()
    );

    mockMvc.perform(multipart(BASE_URL + "/" + randomBook.getId())
            .file(image)
            .param("bookName", "Updated Book")
            .param("title", "Updated Title")
            .param("author", "Updated Author")
            .param("price", "200.0")
            .param("description", "Updated Description")
            .with(request -> {
              request.setMethod("PUT");
              return request;
            }))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(randomBook.getId()))
        .andExpect(jsonPath("$.bookName").value("Updated Book"));
  }

  @Test
  void deleteById() throws Exception {
    var book = new Book();
    book.setBookName("Delete Book " + RandomString.make(6));
    book.setTitle("Delete Title");
    book.setAuthor("Delete Author");
    book.setPrice(50.0);
    book.setDescription("Delete Description");

    var savedBook = bookService.creatBook(book, null);

    mockMvc.perform(delete(BASE_URL + "/" + savedBook.getId())
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNoContent());
  }
}
