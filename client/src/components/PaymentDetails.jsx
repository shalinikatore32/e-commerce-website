import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import '../styles/paymentdetails.css'; 

const PaymentDetails = ({ orderData, authorizedToken, onSuccess, setPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentMethod, setPaymentMethod] = useState('card'); 
    const [qrCodeUrl, setQrCodeUrl] = useState(null); 
    const navigate = useNavigate();

    const handleCardPayment = async () => {
        try {
            const response = await fetch('http://localhost:5005/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authorizedToken}`,
                },
                body: JSON.stringify({ amount: orderData.product_price * 100 * orderData.quantity }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment intent');
            }

            const { clientSecret } = await response.json();

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email: orderData.email,
                        name: orderData.username,
                    },
                },
            });

            if (result.error) {
                toast.error(`Payment failed: ${result.error.message}`);
                setPaymentSuccess(false);
            } else if (result.paymentIntent.status === 'succeeded') {
                await onSuccess();
                setPaymentSuccess(true);
                navigate('/success');
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
            setPaymentSuccess(false);
        }
    };

    const handleUpiPayment = async () => {
        try {
            const response = await fetch('http://localhost:5005/create-upi-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authorizedToken}`,
                },
                body: JSON.stringify({ amount: orderData.product_price * 100 * orderData.quantity }),
            });

            if (!response.ok) {
                throw new Error('Failed to create UPI order');
            }

            const { upiUrl } = await response.json();
            window.location.href = upiUrl; // Redirect to UPI payment page
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
            setPaymentSuccess(false);
        }
    };

    const handleQrPayment = async () => {
        try {
            const response = await fetch('http://localhost:5005/create-qr-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authorizedToken}`,
                },
                body: JSON.stringify({ amount: orderData.product_price * 100 * orderData.quantity }),
            });

            if (!response.ok) {
                throw new Error('Failed to create QR payment');
            }

            const { qrCodeUrl } = await response.json();
            setQrCodeUrl(qrCodeUrl); // Set QR code URL
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
            setPaymentSuccess(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (paymentMethod === 'card') {
            await handleCardPayment();
        } else if (paymentMethod === 'upi') {
            await handleUpiPayment();
        } else if (paymentMethod === 'qr') {
            await handleQrPayment();
        }
    };

    return (
        <div className="payment-details">
            <h2>Payment Details</h2>
            <div className="payment-methods">
                <label className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                    />
                    <span>Credit or Debit Card</span>
                </label>
                <label className={`payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                    />
                    <span>UPI</span>
                </label>
                <label className={`payment-method ${paymentMethod === 'qr' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="qr"
                        checked={paymentMethod === 'qr'}
                        onChange={() => setPaymentMethod('qr')}
                    />
                    <span>QR Code</span>
                </label>
            </div>
            <form onSubmit={handleSubmit} className="payment-form">
                {paymentMethod === 'card' && (
                    <div className="form-group">
                        <label htmlFor="card-element">Credit or debit card</label>
                        <CardElement id="card-element" />
                    </div>
                )}
                {paymentMethod === 'upi' && <p>Redirecting to UPI payment...</p>}
                {paymentMethod === 'qr' && qrCodeUrl && (
                    <div className="qr-code">
                        <img src={qrCodeUrl} alt="QR Code" />
                        <p>Scan this QR code to complete the payment.</p>
                    </div>
                )}
                <button type="submit" className="pay-button">Pay Now</button>
            </form>
        </div>
    );
};

export default PaymentDetails;
