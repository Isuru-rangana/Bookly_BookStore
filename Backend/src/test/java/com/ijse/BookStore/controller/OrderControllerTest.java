package com.ijse.BookStore.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ijse.BookStore.Controler.OrderController;
import com.ijse.BookStore.Model.Order;
import com.ijse.BookStore.Service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OrderController.class)
@AutoConfigureMockMvc(addFilters = false) 
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private OrderService orderService;

    private Order testOrder;
    private List<Order> orderList;

    @BeforeEach
    void setUp() {
    
        testOrder = new Order();
        testOrder.setId(1L);
        testOrder.setCustomerName("Test Customer");
        testOrder.setCustomerAddress("123 Test Street");
        testOrder.setCustomerContactNumber("1234567890");
        testOrder.setTotalAmount(150.00);
        testOrder.setBookName("Book1, Book2");
        testOrder.setBookIds("1,2");
        testOrder.setBookQuantity(2);

        
        orderList = new ArrayList<>();
        orderList.add(testOrder);

        Order secondOrder = new Order();
        secondOrder.setId(2L);
        secondOrder.setCustomerName("Second Customer");
        secondOrder.setCustomerAddress("456 Test Avenue");
        secondOrder.setCustomerContactNumber("9876543210");
        secondOrder.setTotalAmount(200.00);
        secondOrder.setBookName("Book3");
        secondOrder.setBookIds("3");
        secondOrder.setBookQuantity(1);

        orderList.add(secondOrder);
    }

    @Test
    void createOrder_ShouldReturnCreatedStatus() throws Exception {
      
        when(orderService.createOrder(any(Order.class))).thenReturn(testOrder);

     
        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testOrder)))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.customerName", is("Test Customer")))
                .andExpect(jsonPath("$.customerAddress", is("123 Test Street")))
                .andExpect(jsonPath("$.customerContactNumber", is("1234567890")))
                .andExpect(jsonPath("$.totalAmount", is(150.00)))
                .andExpect(jsonPath("$.bookName", is("Book1, Book2")))
                .andExpect(jsonPath("$.bookIds", is("1,2")))
                .andExpect(jsonPath("$.bookQuantity", is(2)));
    }

    @Test
    void createOrder_WithMissingRequiredFields_ShouldStillCreate() throws Exception {
        
        Order incompleteOrder = new Order();
        incompleteOrder.setCustomerName("Incomplete Customer");
        incompleteOrder.setTotalAmount(75.00);
   

        when(orderService.createOrder(any(Order.class))).thenReturn(incompleteOrder);

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(incompleteOrder)))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.customerName", is("Incomplete Customer")))
                .andExpect(jsonPath("$.totalAmount", is(75.00)));
    }

    @Test
    void getAllOrders_ShouldReturnAllOrders() throws Exception {
        
        when(orderService.getAllOrders()).thenReturn(orderList);

      
        mockMvc.perform(get("/api/orders"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].customerName", is("Test Customer")))
                .andExpect(jsonPath("$[0].totalAmount", is(150.00)))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].customerName", is("Second Customer")))
                .andExpect(jsonPath("$[1].totalAmount", is(200.00)));
    }

    @Test
    void getAllOrders_WhenNoOrders_ShouldReturnEmptyArray() throws Exception {
     
        when(orderService.getAllOrders()).thenReturn(new ArrayList<>());

       
        mockMvc.perform(get("/api/orders"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }
} 