import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children, cartSize, setShowCart }) => {
  return (
    <div className="layout">
      <Header size={cartSize} setShow={setShowCart} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 