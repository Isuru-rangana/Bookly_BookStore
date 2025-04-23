package com.ijse.bookstore.Repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ijse.bookstore.Enrirty.Order;

@Repository
public interface OrderRepositary extends JpaRepository<Order, Long>  {

    
}
