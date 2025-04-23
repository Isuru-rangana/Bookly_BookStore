import React from "react";
import './ContactUs.css'; // Import your CSS file


import CallImage from './Image/call.png'

import addressImage from './Image/address.png'
import phoneImage from './Image/phone.gif'
import emailImage from './Image/email.png'



function ContactUs() {
  return (
    <div className="contact-us-container">
      <header>
        <h1>Contact Us</h1>
      </header>
      <main>
      <img className="gif" src={phoneImage} alt="Phone" />
        <section className="contact-info">
          <h2>Contact Information</h2>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={addressImage} alt="Address" />
              <p>123 Main Street, City, Country</p>
            </div>
            <div className="contact-detail">
              <img src={emailImage} alt="Email" />
              <p>contact@example.com</p>
            </div>
            <div className="contact-detail">
              <img src={CallImage} alt="Phone" />
              <p>+1 (123) 456-7890</p>
            </div>
          </div>
        </section>
        <section className="contact-description">
          <h2>Description</h2>
          <p>
            We'd love to hear from you! Whether you have questions about our
            bookstore, need assistance with your order, or just want to say hello,
            feel free to reach out to us using the contact details provided.
          </p>
        </section>
      </main>
    </div>
  );
}

export default ContactUs;
