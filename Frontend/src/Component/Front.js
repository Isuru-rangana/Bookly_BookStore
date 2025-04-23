import React, { useState } from "react";
import Cart from "./Cart";
import BookCard from "./BookCard";
import Slideshow from "./Slideshow";

function Front() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleHideCart = () => {
    setShowCart(false);
  };

  const handleAddToCart = (book) => {
    const existingBook = cart.find((item) => item.id === book.id);

    if (existingBook) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }

    setCart([...cart, { ...book, quantity: 1 }]);
  };

  const handleChange = (book, change) => {
    const updatedCart = cart.map((item) => {
      if (item.id === book.id) {
        item.quantity += change;
      }
      return item;
    });

    setCart(updatedCart);
  };

  return (
    <div>
      <Slideshow/>
      {showCart ? 
        <Cart cart={cart} setCart={setCart} handleChange={handleChange} /> : 
        <BookCard handleAddToCart={handleAddToCart} />
      }
      {warning && <div className="warning">Item is already added to your cart</div>}
    </div>
  );
}

export default Front;
