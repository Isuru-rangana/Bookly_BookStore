// AboutUs.js
import React from "react";
import './AboutUs.css'; // Import your CSS file

function AboutUs() {
  return (
    <div className="about-us-container">
      <header>
        <h1>About Us</h1>
      </header>
      <main>
        <section className="about-content">
          <img className="aboutimg" src="https://imgmediagumlet.lbb.in/media/2017/06/593f78c4cfa0955807265ddf_57da802c69f2130d31d19c5c_1497331908931.jpg?fm=webp&w=750&h=500&dpr=1" alt="Bookstore" />
          <p>
            Welcome to our online bookstore! We are passionate about books and
            strive to provide our customers with a wide selection of books on
            various topics.
          </p>
          <p>
            Our mission is to promote reading and make it easy for book lovers
            to find and purchase their favorite books. We hope you enjoy
            exploring our collection and find books that inspire you.
          </p>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;
