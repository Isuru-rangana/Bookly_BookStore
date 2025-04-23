import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaUser, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';

const Header = ({ size = 0, setShow = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Update user state whenever localStorage changes
  useEffect(() => {
    const checkUserAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Check on mount and when location changes
    checkUserAuth();

    // Listen for storage events (when localStorage changes)
    window.addEventListener('storage', checkUserAuth);

    // Custom event listener for login
    const handleLogin = () => checkUserAuth();
    window.addEventListener('user-login', handleLogin);

    return () => {
      window.removeEventListener('storage', checkUserAuth);
      window.removeEventListener('user-login', handleLogin);
    };
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/allbook?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileOpen(false);
    navigate('/login');
    // Dispatch custom event for logout
    window.dispatchEvent(new Event('user-logout'));
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          {user?.role === 'ADMIN' && (
            <Link to="/admin/dashboard" onClick={closeMenu}>Admin Dashboard</Link>
          )}
        </div>

        <div className="nav-actions">
          <button className="search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <FaSearch />
          </button>
          
          <Link to="/cart" className="cart-btn" onClick={() => setShow(false)}>
            <FaShoppingCart />
            {size > 0 && <span className="cart-count">{size}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <button className="user-info" onClick={toggleProfile}>
                <FaUser className="user-icon" />
                <span className="username">{user.username}</span>
              </button>
              {isProfileOpen && (
                <div className="user-links">
                  <div className="user-links-header">
                    <span>User Profile</span>
                    <button className="close-profile" onClick={closeProfile}>
                      <FaTimes />
                    </button>
                  </div>
                  <Link to="/profile/edit" className="user-link" onClick={closeProfile}>
                    <FaUserEdit className="link-icon" />
                    <span>Edit Profile</span>
                  </Link>
                  {user.role === 'ADMIN' && (
                    <Link to="/admin/dashboard" className="user-link" onClick={closeProfile}>
                      <FaUser className="link-icon" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <button onClick={handleLogout} className="user-link logout-btn">
                    <FaSignOutAlt className="link-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn" onClick={closeMenu}>
              Login
            </Link>
          )}

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
