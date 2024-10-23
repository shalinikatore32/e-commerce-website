import React from 'react';
import { Consumer } from '../store/StoreToken';
import '../styles/about.css';

const About = () => {
  const { user } = Consumer();

  return (
    <div className="about-us-container">
      <div className="about-header animate-fade-in">
        <h1 className="typing-animation">About MenuBook</h1>
        <p>
          Welcome {user ? `${user.username}` : `Guest`} to MenuBook! We are dedicated to providing you with the best dining experience possible. Our mission is to help you discover and explore restaurants with ease.
        </p>
      </div>
      <div className="about-content animate-fade-in">
        <h2 className="typing-animation">Our Story</h2>
        <p>
          MenuBook was founded in 2024 with a passion for food and technology. We started as a small team of food enthusiasts and tech experts who wanted to make restaurant discovery a breeze.
        </p>
        <p>
          Over the years, we have grown and evolved, but our core values remain the same. We strive to provide accurate information, user-friendly design, and excellent customer service.
        </p>
      </div>
      <div className="about-team animate-fade-in">
        <h2 className="typing-animation">Meet the Team</h2>
        <p>
          Our team is made up of talented individuals from diverse backgrounds, all sharing a common love for food and innovation. We are committed to making MenuBook your go-to resource for all things dining.
        </p>
      </div>
    </div>
  );
};

export default About;
