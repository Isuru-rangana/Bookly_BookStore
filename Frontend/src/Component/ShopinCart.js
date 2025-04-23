import React from "react";

function ShoppingCart({ cart, removeFromCart,setCart }) {

    function removeFromCart(index) {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
      }





    return (
      <div>
        <h2>Your Shopping Cart</h2>
        {cart.map((book, index) => (
          <div key={index}>
            <p>{book.title}</p>
            <p>${book.price}</p>
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </div>
        ))}
      </div>
    );
  }
  export default ShoppingCart
  