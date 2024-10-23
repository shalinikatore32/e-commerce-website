import React from 'react';
import '../styles/footer.css'; // Import CSS file for styling
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/service'>Menu</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
            <li><NavLink to='/service'>Order Now</NavLink></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Info</h3>
          <p><i className="fa fa-map-marker"></i> 123 Main Street, Anytown, USA</p>
          <p><i className="fa fa-phone"></i> +1 234 567 890</p>
          <p><i className="fa fa-envelope"></i> info@menubook.com</p>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-instagram"></i></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MenuBook. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
