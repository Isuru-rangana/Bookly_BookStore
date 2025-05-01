package com.ijse.BookStore.service.ServiceImpl;

import com.ijse.BookStore.Model.Order;
import com.ijse.BookStore.Repository.OrderRepository;
import com.ijse.BookStore.Service.ServiceImpl.OrderServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class OrderServiceImplTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    private Order testOrder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
      
        testOrder = new Order();
        testOrder.setId(1L);
        testOrder.setCustomerName("Test Customer");
        testOrder.setCustomerAddress("123 Test Street");
        testOrder.setCustomerContactNumber("1234567890");
        testOrder.setTotalAmount(150.00);
        testOrder.setBookName("Book1, Book2");
        testOrder.setBookIds("1,2");
        testOrder.setBookQuantity(2);
    }

    @Test
    void createOrder_ShouldReturnSavedOrder() {
      
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);

        
        Order savedOrder = orderService.createOrder(testOrder);

      
        assertNotNull(savedOrder);
        assertEquals(testOrder.getId(), savedOrder.getId());
        assertEquals(testOrder.getCustomerName(), savedOrder.getCustomerName());
        assertEquals(testOrder.getCustomerAddress(), savedOrder.getCustomerAddress());
        assertEquals(testOrder.getCustomerContactNumber(), savedOrder.getCustomerContactNumber());
        assertEquals(testOrder.getTotalAmount(), savedOrder.getTotalAmount());
        assertEquals(testOrder.getBookName(), savedOrder.getBookName());
        assertEquals(testOrder.getBookIds(), savedOrder.getBookIds());
        assertEquals(testOrder.getBookQuantity(), savedOrder.getBookQuantity());
        
     
        verify(orderRepository, times(1)).save(testOrder);
    }

    @Test
    void createOrder_ShouldHandleEmptyBookInfo() {
      
        Order orderWithoutBooks = new Order();
        orderWithoutBooks.setId(2L);
        orderWithoutBooks.setCustomerName("Test Customer 2");
        orderWithoutBooks.setCustomerAddress("456 Test Ave");
        orderWithoutBooks.setCustomerContactNumber("9876543210");
        orderWithoutBooks.setTotalAmount(75.00);
      
        
        when(orderRepository.save(any(Order.class))).thenReturn(orderWithoutBooks);

       
        Order savedOrder = orderService.createOrder(orderWithoutBooks);

       
        assertNotNull(savedOrder);
        assertEquals(orderWithoutBooks.getId(), savedOrder.getId());
        assertEquals(orderWithoutBooks.getCustomerName(), savedOrder.getCustomerName());
        assertEquals(orderWithoutBooks.getTotalAmount(), savedOrder.getTotalAmount());
        
      
        verify(orderRepository, times(1)).save(orderWithoutBooks);
    }

    @Test
    void getAllOrders_ShouldReturnAllOrders() {
     
        Order secondOrder = new Order();
        secondOrder.setId(2L);
        secondOrder.setCustomerName("Second Customer");
        secondOrder.setTotalAmount(200.00);

        List<Order> orderList = new ArrayList<>();
        orderList.add(testOrder);
        orderList.add(secondOrder);

        when(orderRepository.findAll()).thenReturn(orderList);

     
        List<Order> result = orderService.getAllOrders();

      
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(testOrder.getId(), result.get(0).getId());
        assertEquals(secondOrder.getId(), result.get(1).getId());
        
       
        verify(orderRepository, times(1)).findAll();
    }

    @Test
    void getAllOrders_ShouldReturnEmptyListWhenNoOrders() {
     
        when(orderRepository.findAll()).thenReturn(new ArrayList<>());

        
        List<Order> result = orderService.getAllOrders();

        
        assertNotNull(result);
        assertEquals(0, result.size());
        
        
        verify(orderRepository, times(1)).findAll();
    }
} 