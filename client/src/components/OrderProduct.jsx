import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/orderproduct.css';
import { toast } from 'react-toastify';
import { Consumer } from '../store/StoreToken';
import PaymentDetails from './PaymentDetails';

const OrderProduct = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const { user } = Consumer();
    const { authorizedToken } = Consumer();

    const [orderData, setOrderData] = useState({
        email: user.email,
        product_name: data.product_name,
        product_price: data.product_price,
        tableNumber: '',
        quantity: ''
    });

    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(null);

    if (!data) {
        return <h1>No data found</h1>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setShowPaymentDetails(true);
    };

    const handleOrderSuccess = async () => {
        const orderResponse = await fetch('http://localhost:5005/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizedToken,
            },
            body: JSON.stringify(orderData),
        });

        if (orderResponse.ok) {
            toast.success("Order placed successfully");
            setPaymentSuccess(true);
        } else {
            const errorData = await orderResponse.json();
            toast.error(`Your order couldn't be placed: ${errorData.message}`);
            setPaymentSuccess(false);
        }
    };

    return (
        <div className="order-container">
            {!showPaymentDetails ? (
                <>
                    <div className="product-details">
                        <img src={data.image} alt={data.product_name} className="product-image" />
                        <h3>{data.product_name}</h3>
                        <h4 className="price">{`$${data.product_price}`}</h4>
                        <p className="description">{data.product_description}</p>
                    </div>
                    <div className="order-form">
                        <h2>Place Your Order</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    // onChange={handleChange}
                                    placeholder="Enter the current logged-in email"
                                    required
                                />
                            </div>
                            <div>
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="product_name"
                                    value={orderData.product_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="product_price"
                                    value={orderData.product_price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Table Number</label>
                                <input
                                    type="text"
                                    name="tableNumber"
                                    value={orderData.tableNumber}
                                    onChange={handleChange}
                                    placeholder="Table Number"
                                    required
                                />
                            </div>
                            <div>
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={orderData.quantity}
                                    onChange={handleChange}
                                    placeholder="Quantity"
                                    required
                                />
                            </div>
                            <button type="submit">Place Order</button>
                        </form>
                    </div>
                </>
            ) : (
                <PaymentDetails orderData={orderData} authorizedToken={authorizedToken} onSuccess={handleOrderSuccess} setPaymentSuccess={setPaymentSuccess} />
            )}
            {paymentSuccess !== null && (
                <div className={`payment-status ${paymentSuccess ? 'success' : 'failure'}`}>
                    {paymentSuccess ? 'Payment successful! Your order has been placed.' : 'Payment failed! Please try again.'}
                </div>
            )}
        </div>
    );
};

export default OrderProduct;
