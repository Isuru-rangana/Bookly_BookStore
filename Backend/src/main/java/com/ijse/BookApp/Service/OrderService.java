package com.ijse.bookstore.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ijse.bookstore.Enrirty.Order;

@Service


public interface OrderService {
    Order createOrder(Order order);
    List<Order> getAllOrders();
}
