import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaBook, FaChevronDown } from 'react-icons/fa';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <FaBook size={24} />
          <span className="logo-text">BookStore</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="dropdown">
            <Link 
              to="/books" 
              className={location.pathname.includes('/books') ? 'active' : ''}
              onClick={closeMenu}
            >
              Books <FaChevronDown style={{ marginLeft: '4px', fontSize: '12px' }} />
            </Link>
            <div className="dropdown-content">
              <Link to="/books/fiction" onClick={closeMenu}>Fiction</Link>
              <Link to="/books/non-fiction" onClick={closeMenu}>Non-Fiction</Link>
              <Link to="/books/academic" onClick={closeMenu}>Academic</Link>
              <Link to="/books/children" onClick={closeMenu}>Children's Books</Link>
            </div>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="auth-buttons">
          <button className="login-btn" onClick={closeMenu}>
            Login
          </button>
          <button className="signup-btn" onClick={closeMenu}>
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header; 