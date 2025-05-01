package com.ijse.BookStore.Model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name ="orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerName;
    private String customerAddress;
    private String customerContactNumber;
    private double totalAmount;
    
    @Column(length = 1000)
    private String bookName;  // Comma-separated book names
    
    @Column(length = 500)
    private String bookIds;   // Comma-separated book IDs
    
    private Integer bookQuantity;  // Total quantity of books ordered

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private List<Book> books;
}
