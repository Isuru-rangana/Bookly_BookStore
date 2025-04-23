import React from "react";
import './Cart.css';

function ShoppingCart({ cart, setCart }) {
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((book, index) => (
            <div key={index} className="cart-item">
              <div className="item-info">
                <h3>{book.title}</h3>
                <p className="price">${book.price}</p>
              </div>
              <button 
                className="remove-button"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
  