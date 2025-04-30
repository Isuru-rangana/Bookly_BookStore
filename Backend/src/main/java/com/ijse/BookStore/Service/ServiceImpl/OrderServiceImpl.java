package com.ijse.BookStore.Service.ServiceImpl;

import java.util.List;

import com.ijse.BookStore.Model.Order;
import com.ijse.BookStore.Repository.OrderRepository;
import com.ijse.BookStore.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

  
    private OrderRepository orderRepository;


    @Autowired
    public OrderServiceImpl(OrderRepository orderRepositary) {
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
