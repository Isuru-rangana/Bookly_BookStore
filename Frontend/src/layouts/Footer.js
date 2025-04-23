import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About DDotBook</h3>
          <p>
            Discover a world of books at DDotBook. We're passionate about connecting readers 
            with their next favorite book, offering a carefully curated selection of titles 
            across all genres.
          </p>
        </div>

        <div className="footer-section">
          <h3>Popular Categories</h3>
          <ul>
            <li><Link to="/Books?category=fiction">Fiction</Link></li>
            <li><Link to="/Books?category=non-fiction">Non-Fiction</Link></li>
            <li><Link to="/Books?category=mystery">Mystery</Link></li>
            <li><Link to="/Books?category=romance">Romance</Link></li>
            <li><Link to="/Books?category=science-fiction">Science Fiction</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/About">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter for updates and exclusive offers!</p>
          <form className="footer-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} DDotBook. All rights reserved.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
