package com.ijse.bookstore.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.bookstore.Enrirty.Order;
import com.ijse.bookstore.Repositary.OrderRepositary;

@Service
public class OrderServiceImpl implements OrderService {

  
    private OrderRepositary orderRepository;


    @Autowired
    public OrderServiceImpl(OrderRepositary orderRepositary) {
        this.orderRepository = orderRepositary;
    }

    @Override
    public Order createOrder(Order order) {
    
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
