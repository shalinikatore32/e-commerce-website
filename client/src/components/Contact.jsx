import React, { useState, useEffect } from 'react';
import '../styles/contact.css';
import { Consumer } from '../store/StoreToken';
import { toast } from 'react-toastify';

const Contact = () => {
  const [user1, setUser] = useState({
    fname: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { user } = Consumer();

  useEffect(() => {
    if (user) {
      setUser({
        fname: user.username,
        email: user.email,
        message: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user1,
      [name]: value,
    });
    setSuccess(false); // Reset success message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(`http://localhost:5005/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user1)
    });

    setLoading(false);

    if (response.ok) {
      toast.success("Data sent successfully");
      setSuccess(true);
      setUser({
        fname: "",
        email: "",
        message: "",
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleClear = () => {
    setUser({
      fname: "",
      email: "",
      message: "",
    });
    setSuccess(false); // Reset success message
  };

  return (
    <div className="contact-form-container animate-fade-in">
      <h2 className="contact-header">Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            value={user1.fname}
            name="fname"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            value={user1.email}
            name="email"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            onChange={handleChange}
            value={user1.message}
            name="message"
            className="form-textarea"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button type="button" className="clear-button" onClick={handleClear}>
          Clear
        </button>
      </form>
      {success && <p className="success-message">Your message has been sent!</p>}
    </div>
  );
};

export default Contact;
