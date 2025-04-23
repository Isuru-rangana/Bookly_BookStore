import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ size = 0, setShow = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to allbook page with search query
      navigate(`/allbook?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="main-header">
      <nav className="nav-container">
        <div className="logo-container">
          <Link to="/" className="logo" onClick={closeMenu}>
            DDotBook
          </Link>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/allbook" onClick={closeMenu}>Books</Link>
          <Link to="/contactus" onClick={closeMenu}>Contact</Link>
          <Link to="/aboutus" onClick={closeMenu}>About</Link>
          {/* Admin Links */}
          <Link to="/bookadd" onClick={closeMenu}>Add Book</Link>
          <Link to="/addcategory" onClick={closeMenu}>Add Category</Link>
        </div>

        <div className="nav-actions">
          <button className="search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <FaSearch />
          </button>
          
          <Link to="/cart" className="cart-btn" onClick={() => setShow(false)}>
            <FaShoppingCart />
            {size > 0 && <span className="cart-count">{size}</span>}
          </Link>

          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Search overlay */}
      <div className={`search-overlay ${isSearchOpen ? 'active' : ''}`}>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search for books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-submit">
              <FaSearch />
            </button>
            <button type="button" className="search-close" onClick={() => setIsSearchOpen(false)}>
              <FaTimes />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
