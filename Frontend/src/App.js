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
            <Route path="/" element={<Home />} />
            <Route path="/slideshow" element={<Slideshow />} />
            <Route path="/bookadd" element={<BookAdd />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/allbook" element={<Allbook />} />
            <Route path="/bookcard" element={<BookCard addToCart={addToCart} />} />
            <Route path="/bookmore" element={<BookMore />} />
            <Route path="/cart" element={<ShoppingCart cart={cart} />} />
            <Route path="/front" element={<Front />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/aboutus" element={<AboutUs />} />
            
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
