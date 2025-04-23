import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaPen, FaArrowUp, FaEnvelope, FaStar } from 'react-icons/fa';
import './Home.css';

function Home() {
  const [email, setEmail] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredBooks = [
    {
      id: 1,
      title: "The Art of Programming",
      description: "A comprehensive guide to modern programming practices and patterns.",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1",
      rating: 4.8,
      author: "John Smith"
    },
    {
      id: 2,
      title: "Digital Marketing Essentials",
      description: "Learn the fundamentals of digital marketing in the modern age.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1",
      rating: 4.6,
      author: "Emma Johnson"
    },
    {
      id: 3,
      title: "Business Strategy",
      description: "Strategic thinking and planning for business success.",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1",
      rating: 4.9,
      author: "Michael Brown"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredBooks.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { icon: <FaBook />, count: "10,000+", label: "Books Available" },
    { icon: <FaUsers />, count: "50,000+", label: "Active Readers" },
    { icon: <FaPen />, count: "1,000+", label: "Authors" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Book</h1>
          <p>Explore our vast collection of books across various genres</p>
          <Link to="/books" className="cta-button">
            Browse Books
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.count}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="featured-books">
        <h2>Featured Books</h2>
        <div className="book-grid">
          {featuredBooks.map((book, index) => (
            <div 
              key={book.id} 
              className={`book-card ${index === currentIndex ? 'active' : ''}`}
            >
              <div className="book-image-wrapper">
                <img src={book.image} alt={book.title} className="book-cover" />
                <div className="book-overlay">
                  <div className="book-rating">
                    <FaStar /> {book.rating}
                  </div>
                </div>
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="book-author">By {book.author}</p>
                <p>{book.description}</p>
                <Link to={`/book/${book.id}`} className="read-more">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <div className="category-content">
              <h3>Fiction</h3>
              <p>Explore imaginative worlds and compelling stories</p>
              <Link to="/category/fiction" className="category-link">
                View Books
              </Link>
            </div>
          </div>
          <div className="category-card">
            <div className="category-content">
              <h3>Non-Fiction</h3>
              <p>Discover real-world knowledge and insights</p>
              <Link to="/category/non-fiction" className="category-link">
                View Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest book releases and updates</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top ${showScrollButton ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </button>
    </div>
  );
}

export default Home;