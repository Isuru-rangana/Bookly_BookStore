import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
import {
  getCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} from "../utils/cartUtils";

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    contactNumber: "",
  });
  const [orderStatus, setOrderStatus] = useState({ message: "", type: "" });
  const [placedOrder, setPlacedOrder] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const cartData = getCart();
    console.log("[ShopinCart] Cart data loaded:", cartData);
    setCart(cartData);
  }, []);

  // Handle countdown after successful order
  useEffect(() => {
    let timer;
    if (placedOrder && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (placedOrder && countdown === 0) {
      navigate("/");
    }
    return () => clearTimeout(timer);
  }, [placedOrder, countdown, navigate]);

  const handleQuantityChange = (bookId, change) => {
    const updatedCart = updateItemQuantity(bookId, change);
    console.log("[ShopinCart] Updated quantity for item:", bookId);
    setCart(updatedCart);
  };

  const removeFromCart = (bookId) => {
    const updatedCart = removeItemFromCart(bookId);
    console.log("[ShopinCart] Removed item from cart:", bookId);
    setCart(updatedCart);
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    // Validate customer information
    if (
      !customerInfo.name ||
      !customerInfo.address ||
      !customerInfo.contactNumber
    ) {
      setOrderStatus({
        message: "Please fill in all customer information",
        type: "error",
      });
      return;
    }

    // Prepare book details from cart items
    const bookNames = cart.map((item) => item.title).join(", ");
    const bookQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const bookIds = cart.map((item) => item.id).join(",");

    // Prepare order data - make sure field names match the backend model
    const orderData = {
      customerName: customerInfo.name,
      customerAddress: customerInfo.address,
      customerContactNumber: customerInfo.contactNumber,
      totalAmount: parseFloat(calculateTotalPrice()),
      bookName: bookNames,
      bookIds: bookIds,
      bookQuantity: bookQuantity,
    };

    try {
      console.log("[ShopinCart] Sending order data:", orderData);
      const response = await axios.post(
        "http://localhost:9004/api/orders",
        orderData
      );

      // Order successful
      setOrderStatus({
        message: "Order placed successfully!",
        type: "success",
      });

      // Store order details for display
      setPlacedOrder({
        id: response.data.id || Date.now(), // Use response ID or fallback to timestamp
        customerName: customerInfo.name,
        customerAddress: customerInfo.address,
        customerContactNumber: customerInfo.contactNumber,
        totalAmount: calculateTotalPrice(),
        items: [...cart], // Save a copy of cart items for order summary
        orderDate: new Date().toLocaleString(),
        bookName: bookNames,
        bookQuantity: bookQuantity,
      });

      // Clear cart
      clearCart();
      setCart([]);
    } catch (error) {
      console.error("[ShopinCart] Error placing order:", error);
      setOrderStatus({
        message:
          error.response?.data || "Error placing order. Please try again.",
        type: "error",
      });
    }
  };

  // Render order success view
  if (placedOrder) {
    return (
      <div className="shopping-cart-container">
        <div className="success-order">
          <h3>Thank You for Your Order!</h3>
          <p>Your order has been successfully placed.</p>
          <p className="order-number">Order ID: {placedOrder.id}</p>

          <div className="order-details">
            <h4>Order Summary</h4>
            <p>
              <strong>Order ID:</strong> {placedOrder.id}
            </p>
            <p>
              <strong>Customer:</strong> {placedOrder.customerName}
            </p>
            <p>
              <strong>Shipping Address:</strong> {placedOrder.customerAddress}
            </p>
            <p>
              <strong>Contact:</strong> {placedOrder.customerContactNumber}
            </p>
            <p>
              <strong>Order Date:</strong> {placedOrder.orderDate}
            </p>
            <p>
              <strong>Total Amount:</strong> ${placedOrder.totalAmount}
            </p>
            <p>
              <strong>Total Items:</strong> {placedOrder.bookQuantity}
            </p>
          </div>

          <div className="ordered-items">
            <h4>Ordered Items</h4>
            {placedOrder.items.map((item) => (
              <div key={item.id} className="ordered-item">
                <p>
                  <strong>Book ID:</strong> {item.id}
                </p>
                <p>
                  <strong>Title:</strong> {item.title}
                </p>
                <p>
                  <strong>Price:</strong> ${item.price} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <p className="redirect-message">
            You will be redirected to the homepage in {countdown} seconds...
          </p>
          <button className="continue-shopping" onClick={() => navigate("/")}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart-container">
      <h2>Your Shopping Cart</h2>

      {orderStatus.message && (
        <div className={`order-status ${orderStatus.type}`}>
          {orderStatus.message}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button
            className="continue-shopping"
            onClick={() => navigate("/allbook")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.image || "https://via.placeholder.com/80x100"}
                    alt={item.title}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="author">by {item.author}</p>
                  <p className="price">${item.price} each</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <h3>Order Summary</h3>
              <div className="total-line">
                <span>Subtotal:</span>
                <span>${calculateTotalPrice()}</span>
              </div>
              <div className="total-line">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total-line total">
                <span>Total:</span>
                <span>${calculateTotalPrice()}</span>
              </div>
            </div>

            <div className="customer-info">
              <h3>Customer Information</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={handleInfoChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                value={customerInfo.address}
                onChange={handleInfoChange}
                required
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={customerInfo.contactNumber}
                onChange={handleInfoChange}
                required
              />
            </div>

            <div className="checkout-actions">
              <button
                className="continue-shopping"
                onClick={() => navigate("/allbook")}
              >
                Continue Shopping
              </button>
              <button className="checkout-button" onClick={handleCheckout}>
                Place Order
              </button>
            </div>
          </div>
        </>
      )}

      {/* Debug section - remove in production */}
      <div
        className="debug-section"
        style={{
          marginTop: "50px",
          padding: "20px",
          border: "1px dashed #ccc",
          borderRadius: "8px",
        }}
      >
        <h3>Debug Information (remove in production)</h3>
        <p>Cart Item Count: {cart.length}</p>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {JSON.stringify(cart, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default ShoppingCart;
