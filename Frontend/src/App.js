import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Home from './Component/Home';
import Slideshow from './Component/Slideshow';
import BookAdd from './Component/BookAdd';
import AddCategory from './Component/AddCategory';
import Allbook from './Component/Allbooks';
import BookCard from './Component/BookCard'; 
import BookMore from './Component/BookMore';
import ShoppingCart from './Component/ShopinCart';
import Front from './Component/Front';
import AddBook from './Component/AddBook';
import Contactus from './Component/Contactus';
import AboutUs from './Component/About Us';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import ProtectedRoute from './Component/Auth/ProtectedRoute';
import AdminDashboard from './Component/Admin/AdminDashboard';
import CategoryManagement from './Component/Admin/CategoryManagement';
import BookManagement from './Component/Admin/BookManagement';
import { getCart } from './utils/cartUtils';

function App() {
  const [cartSize, setCartSize] = useState(0);
  const [showCart, setShowCart] = useState(false);

  // Update cart size when the component mounts and whenever localStorage changes
  useEffect(() => {
    // Function to update cart size
    const updateCartSize = () => {
      const cart = getCart();
      setCartSize(cart.length);
    };

    // Set up event listener for storage changes
    window.addEventListener('storage', updateCartSize);
    
    // Initial update
    updateCartSize();
    
    // Set up interval to check cart size every second
    const intervalId = setInterval(updateCartSize, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('storage', updateCartSize);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Router>
      <Layout cartSize={cartSize} setShowCart={setShowCart}>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/slideshow" element={<Slideshow />} />
            <Route path="/allbook" element={<Allbook />} />
            <Route path="/bookcard" element={<BookCard />} />
            <Route path="/bookmore" element={<BookMore />} />
            <Route path="/front" element={<Front />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/cart" element={<ShoppingCart />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <CategoryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/books"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <BookManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-category"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <CategoryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-book"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <BookManagement />
                </ProtectedRoute>
              }
            />

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
