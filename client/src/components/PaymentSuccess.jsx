import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/paymentSuccess.css';

const PaymentSuccess = () => {
    return (
        <div className="success-container">
            <h1>Payment Successful!</h1>
            <p>Thank you for your order. Your payment has been processed successfully.</p>
            <Link to="/" className="home-link">Go to Homepage</Link>
        </div>
    );
};

export default PaymentSuccess;
