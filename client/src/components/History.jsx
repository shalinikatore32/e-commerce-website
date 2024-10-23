import React, { useState, useEffect, useContext } from 'react';
import '../styles/history.css';
import { Consumer } from '../store/StoreToken'; // assuming this is the context provider
import DoneIcon from '@mui/icons-material/Done'; // ensure this is the correct import for DoneIcon
import { toast } from 'react-toastify'; // ensure you have react-toastify installed and correctly set up

const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { user, authorizedToken } = Consumer(); // useContext to access the context

  const getAllHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5005/fetch/user/history/${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizedToken,
        },
      });

      const response_data = await response.json();
      if (response.ok) {
        toast.success("History fetched successfully");
        setOrderHistory(response_data);
      } else {
        toast.error("Failed to fetch history");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while fetching history");
    }
  };


  return (
    <div className="order-history">
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Table Number</th>
            <th>Date</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order, index) => (
            <tr key={index}>
              <td>{order.tableNumber}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.product_name}</td>
              <td>${order.product_price}</td>
              <td>{order.quantity}</td>
              <td>{order.status ? <DoneIcon className="done-icon" /> : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
