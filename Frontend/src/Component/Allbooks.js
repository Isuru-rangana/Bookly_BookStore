import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Allbooks.css';
import { getCart, addItemToCart } from '../utils/cartUtils';

function Allbook() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart from localStorage
    const cartData = getCart();
    setCart(cartData);
    console.log('[Allbooks] Cart loaded with', cartData.length, 'items');

    // Fetch books
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:9004/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    // Fetch categories
    async function fetchCategories() {
      try {
        const response = await axios.get("http://localhost:9004/categores");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchBooks();
    fetchCategories();
  }, []);

  const addToCart = (book) => {
    try {
      // Add item to cart using utility function
      const updatedCart = addItemToCart(book);
      
      // Update local state
      setCart(updatedCart);
      
      // Show notification
      setNotification({ 
        show: true, 
        message: `${book.title} added to cart!` 
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
      
      console.log('[Allbooks] Added to cart:', book.title);
      console.log('[Allbooks] Current cart:', updatedCart);
    } catch (error) {
      console.error('[Allbooks] Error adding to cart:', error);
    }
  };

  const viewDetails = (book) => {
    // Store selected book in sessionStorage
    sessionStorage.setItem('selectedBook', JSON.stringify(book));
    navigate('/bookmore');
  };

  // Filter books based on search and category
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || book.category?.id === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="books-container">
      <h1 className="page-title">Featured Books</h1>
      
      {/* Search and Filter Bar */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search books..." 
          className="search-input" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.cname}
            </option>
          ))}
        </select>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className="notification">
          {notification.message}
        </div>
      )}

      {/* Books Grid */}
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-item">
              <div className="book-image">
                <img src={book.image || 'https://via.placeholder.com/150x200'} alt={book.title} />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <div className="book-price">${book.price}</div>
                <p className="book-category">{book.category?.cname || 'Uncategorized'}</p>
                <div className="book-actions">
                  <button 
                    className="add-to-cart"
                    onClick={() => addToCart(book)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="view-details"
                    onClick={() => viewDetails(book)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No books found matching your search criteria.</p>
        )}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <p>{cart.length} {cart.length === 1 ? 'item' : 'items'} in cart</p>
          <button 
            className="view-cart-btn"
            onClick={() => navigate('/cart')}
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Allbook;