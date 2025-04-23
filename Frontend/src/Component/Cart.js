import React, { useState } from "react";
import './Cart.css'
import axios from "axios";

const Cart = ({ cart, setCart, handleChange }) => {

   const [customerName, setCustomerName] = useState("");
   const [customerAddress, setCustomerAddress] = useState("");
   const [customerContactNumber, setCustomerContactNumber] = useState("");
   const [bookName, setBookName] = useState("");
   




  const handleRemove = (id) => {
    const updatedCart = cart.filter((book) => book.id !== id);
    setCart(updatedCart);
  };



  const handleCheckout = () => {
    // Define order data
    const orderData = {
      bookName: bookName, 
      totalPrice: calculateTotalPrice(cart),
      bookQuantity: cart.length,
      customerName: "Customer Name",
      address: "Customer Address", 
      contactNumber: "Customer Contact Number",
    };

    axios
      .post("http://localhost:9004/api/orders", orderData) // Replace with your backend URL
      .then((response) => {
        console.log(response.data); // Order placed successfully
        // Optionally, clear the cart or perform other actions
      })
      .catch((error) => {
        console.error(error);
      });
  };









  return (
    <article>
      {cart.map((book) => (
        <div className="cart_box" key={book.id}>
          <div className="cart_img">
            <img src={book.image} alt={book.title} />
            <p>{book.bookname}</p>
          </div>
          <div>
            <button onClick={() => handleChange(book, 1)}>+</button>
            <button>{book.quantity}</button>
            <button onClick={() => handleChange(book, -1)}>-</button>
          </div>
          <div>
            <span>{book.price}</span>
            <button onClick={() => handleRemove(book.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span>Rs - {calculateTotalPrice(cart)}</span>
      </div>

      <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Customer Address"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="Contact Number"
          value={customerContactNumber}
          onChange={(e) => setCustomerContactNumber(e.target.value)}
        />
      
      <button onClick={handleCheckout}>Checkout</button>
    </article>
  );
};

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, book) => total + book.price * book.quantity, 0);
};

export default Cart;
