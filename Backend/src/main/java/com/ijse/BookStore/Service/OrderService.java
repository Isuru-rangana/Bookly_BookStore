package com.ijse.BookStore.Service;

import java.util.List;

import com.ijse.BookStore.Model.Order;
import org.springframework.stereotype.Service;

@Service

public interface OrderService {
    Order createOrder(Order order);
    List<Order> getAllOrders();
}
