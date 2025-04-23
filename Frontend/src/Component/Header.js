import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ size, setShow }) => {
  return (
    <nav>
      <div className="nav_box" >
        <span className="my_shop"onClick={() => setShow(true)}>Home</span>
        <ul>
            
   
              <li><a href={`/contact`}>Contact Us</a></li>
              <li><a href={`/About`}>About</a></li>
      </ul>

        <div className="cart" onClick={() => setShow(false)}>
          <span>
            <i className="fas fa-cart-plus"></i>
          </span>
          <span>{size}</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
