import React from 'react';
import './Footer.css';
import  LinkedIn from '../Component/Image/svgs/linkedin.svg';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
            We'd love to hear from you! Whether you have questions about our
            bookstore, need assistance with your order, or just want to say hello,
            feel free to reach out to us using the contact details provided.
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li><a href="">fantasy</a></li>
              <li><a href="">horror</a></li>
              <li><a href="">mystery</a></li>
              <li><a href=""> romance</a></li>
              <li><a href="">science fiction</a></li>
              <li><a href="">Templates</a></li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="http://scanfcode.com/about/">About Us</a></li>
              <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
              <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="http://scanfcode.com/sitemap/">DDotBook</a></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2017 All Rights Reserved by <a href="#">DDotBook</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              

            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
