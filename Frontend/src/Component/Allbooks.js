import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Allbooks.css';

function Allbook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:9004/books");
      setBooks(response.data);
    }
    fetchData();
  }, []);

  return (
    <div className="books-container">
      <h1 className="page-title">Featured Books</h1>
      
      {/* Search and Filter Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search books..." className="search-input" />
        <select className="category-filter">
          <option value="">All Categories</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="mystery">Mystery</option>
        </select>
      </div>

      {/* Books Grid */}
      <div className="books-grid">
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <div className="book-image">
              <img src={book.image || 'https://via.placeholder.com/150x200'} alt={book.title} />
            </div>
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <div className="book-price">${book.price}</div>
              <p className="book-category">{book.category}</p>
              <div className="book-actions">
                <button className="add-to-cart">Add to Cart</button>
                <button className="view-details">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn">Previous</button>
        <span className="page-number">1</span>
        <span className="page-number active">2</span>
        <span className="page-number">3</span>
        <button className="page-btn">Next</button>
      </div>
    </div>
  );
}

export default Allbook;