import React, { useEffect, useState } from 'react';

import './userdata.css'; 
import { Consumer } from '../store/StoreToken';
import { toast } from 'react-toastify';
import DoneIcon from '@mui/icons-material/Done';

function UserData() {
  const [users, setUser] = useState([]);

  const { authorizedToken } = Consumer();

  const getAllUsersData = async () => {
    try {
      const resp = await fetch(`http://localhost:5005/admin/users/order`, {
        method: 'GET',
        headers: {
          Authorization: authorizedToken,
        },
      });
      const resp_data = await resp.json();
      console.log(resp);
      console.log(resp_data);

      if (resp.ok) {
        toast.success("User Data Displayed Successfully");
        setUser(resp_data);
      } else {
        toast.error("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <div className="user-data-container">
      <h2>User Data</h2>
      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              
              <th>Email</th>
              <th>Product Name</th>
              <th>Table Number</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Serve</th>
              
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user, index) => {
                const { _id, email,product_name,tableNumber,
                    quantity,
                    status,createdAt
                     } = user;
                return (
                  <tr key={index}>
                  
                    <td>{email}</td>
                    <td>{product_name}</td>
                    <td>{tableNumber}</td>
                    <td>{quantity}</td>
                    <td>{status ? 'Completed' : 'Pending'}</td>
                    <td>{createdAt}</td>
                   
                   {
                    status?
                   <DoneIcon className='done-icon'/>: <td>
                    <button type='button' className="delete-button" >Serve</button>
                  </td>
                   }
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserData;
