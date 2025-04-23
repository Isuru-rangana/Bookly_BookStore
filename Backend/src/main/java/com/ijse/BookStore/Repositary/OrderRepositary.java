package com.ijse.BookStore.Repositary;

import com.ijse.BookStore.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepositary extends JpaRepository<Order, Long>  {

    
}
