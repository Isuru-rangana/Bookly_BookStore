import React, { useState } from 'react';
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

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  function addToCart(book) {
    setCart([...cart, book]);
  }

  return (
    <Router>
      <Layout cartSize={cart.length} setShowCart={setShowCart}>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/slideshow" element={<Slideshow />} />
            <Route path="/allbook" element={<Allbook />} />
            <Route path="/bookcard" element={<BookCard addToCart={addToCart} />} />
            <Route path="/bookmore" element={<BookMore />} />
            <Route path="/front" element={<Front />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/aboutus" element={<AboutUs />} />

            {/* Protected User Routes */}
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
                  <ShoppingCart cart={cart} />
                </ProtectedRoute>
              } 
            />

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
