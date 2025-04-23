import React from "react";

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="item-info">
        <img src={item.image} alt={item.title} />
        <div>
          <h2>{item.title}</h2>
          <p>Price: Rs {item.price}</p>
          <p>Quantity: {item.amount}</p>
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
