package com.ijse.BookStore.Model;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name ="books")
@Data


public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String bookname;

    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private double price;
    
    @Column(nullable = false)
    private String description;

    @Column
    private String Category;

    @Column
    private String Subcategory;
    
     @Column
     private String image; 

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private SubCategory subcategory;

    
}
