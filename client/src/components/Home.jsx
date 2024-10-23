import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faStar, faTags } from '@fortawesome/free-solid-svg-icons';
import '../styles/home.css';

const Home = () => {
  return (
    <>
      <section id="hero">
        <div className="home-container">
          <div className="hero-content">
            <div className="hero-text">
              <h2>Welcome to Menu Book</h2>
              <p>Discover our delicious menus and find your favorite dishes.</p>
              <a href="#menus" className="cta-button">Explore Menus</a>
            </div>
          </div>
        </div>
      </section>
      <section id="books">
        <div className="books-container">
          <h2>Explore Our Books</h2>
          <div className="books-grid">
            <div className="book-card">
              <FontAwesomeIcon icon={faBookOpen} className="book-icon" />
              <h3>Latest Releases</h3>
              <p>Discover the latest books from your favorite authors.</p>
              <a href="#latest" className="card-button">Browse Now</a>
            </div>
            <div className="book-card">
              <FontAwesomeIcon icon={faStar} className="book-icon" />
              <h3>Best Sellers</h3>
              <p>Check out the best-selling books of the year.</p>
              <a href="#bestsellers" className="card-button">See Top Picks</a>
            </div>
            <div className="book-card">
              <FontAwesomeIcon icon={faTags} className="book-icon" />
              <h3>Special Offers</h3>
              <p>Get great deals on our special offers and discounts.</p>
              <a href="#offers" className="card-button">Grab Deals</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
