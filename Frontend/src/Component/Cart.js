import React, { useState } from "react";
import './Cart.css'
import axios from "axios";

const Cart = ({ cart, setCart, handleChange }) => {

   const [customerName, setCustomerName] = useState("");
   const [customerAddress, setCustomerAddress] = useState("");
   const [customerContactNumber, setCustomerContactNumber] = useState("");
   const [errors, setErrors] = useState({});
   const [checkoutStatus, setCheckoutStatus] = useState(null);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((book) => book.id !== id);
    setCart(updatedCart);
  };

  // Validate contact number - should be numeric and proper length
  const validateContactNumber = (number) => {
    const numericRegex = /^\d+$/;
    return numericRegex.test(number) && number.length >= 10;
  };

  // Validate quantity - prevent negative or excessive quantities
  const validateQuantity = (book, change) => {
    const newQuantity = book.quantity + change;
    if (newQuantity < 1) {
      return false;
    }
    if (newQuantity > 10) {
      alert(`Sorry, you cannot add more than 10 of the same book.`);
      return false;
    }
    return true;
  };

  // Enhanced handle change with quantity validation
  const handleChangeWithValidation = (book, change) => {
    if (validateQuantity(book, change)) {
      handleChange(book, change);
    }
  };

  const validateCheckout = () => {
    const newErrors = {};
    
    if (!customerName.trim()) {
      newErrors.customerName = "Name is required";
    } else if (customerName.trim().length < 3) {
      newErrors.customerName = "Name must be at least 3 characters";
    }
    
    if (!customerAddress.trim()) {
      newErrors.customerAddress = "Address is required";
    }
    
    if (!customerContactNumber.trim()) {
      newErrors.customerContactNumber = "Contact number is required";
    } else if (!validateContactNumber(customerContactNumber)) {
      newErrors.customerContactNumber = "Please enter a valid contact number (at least 10 digits)";
    }
    
    if (cart.length === 0) {
      newErrors.cart = "Your cart is empty";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (!validateCheckout()) {
      setCheckoutStatus({ success: false, message: "Please fix the errors before checkout" });
      return;
    }
    
    setCheckoutStatus({ pending: true, message: "Processing your order..." });
    
    // Define order data
    const orderData = {
      bookName: cart.map(book => book.bookname).join(", "), 
      totalPrice: calculateTotalPrice(cart),
      bookQuantity: cart.reduce((total, book) => total + book.quantity, 0),
      customerName: customerName,
      address: customerAddress, 
      contactNumber: customerContactNumber,
    };

    axios
      .post("http://localhost:9004/api/orders", orderData)
      .then((response) => {
        console.log(response.data);
        setCheckoutStatus({ success: true, message: "Order placed successfully!" });
        // Clear the cart
        setCart([]);
        // Reset form
        setCustomerName("");
        setCustomerAddress("");
        setCustomerContactNumber("");
      })
      .catch((error) => {
        console.error(error);
        setCheckoutStatus({ 
          success: false, 
          message: error.response?.data?.message || "Failed to place order. Please try again."
        });
      });
  };

  return (
    <article>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some books to get started</p>
        </div>
      ) : (
        cart.map((book) => (
          <div className="cart_box" key={book.id}>
            <div className="cart_img">
              <img src={book.image} alt={book.title} />
              <p>{book.bookname}</p>
            </div>
            <div>
              <button onClick={() => handleChangeWithValidation(book, 1)}>+</button>
              <button>{book.quantity}</button>
              <button onClick={() => handleChangeWithValidation(book, -1)}>-</button>
            </div>
            <div>
              <span>{book.price}</span>
              <button onClick={() => handleRemove(book.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      
      {cart.length > 0 && (
        <>
          <div className="total">
            <span>Total Price of your Cart</span>
            <span>Rs - {calculateTotalPrice(cart)}</span>
          </div>

          <div className="checkout-form">
            <h3>Customer Details</h3>
            
            <div className="form-group">
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={errors.customerName ? "error-input" : ""}
              />
              {errors.customerName && <span className="error-message">{errors.customerName}</span>}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Customer Address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className={errors.customerAddress ? "error-input" : ""}
              />
              {errors.customerAddress && <span className="error-message">{errors.customerAddress}</span>}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Contact Number"
                value={customerContactNumber}
                onChange={(e) => setCustomerContactNumber(e.target.value)}
                className={errors.customerContactNumber ? "error-input" : ""}
              />
              {errors.customerContactNumber && <span className="error-message">{errors.customerContactNumber}</span>}
            </div>
            
            {errors.cart && <div className="error-message">{errors.cart}</div>}
            
            {checkoutStatus && (
              <div className={`status-message ${checkoutStatus.success ? "success" : "error"}`}>
                {checkoutStatus.message}
              </div>
            )}
            
            <button 
              onClick={handleCheckout}
              disabled={checkoutStatus?.pending}
              className="checkout-button"
            >
              {checkoutStatus?.pending ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </article>
  );
};

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, book) => total + book.price * book.quantity, 0);
};

export default Cart;
