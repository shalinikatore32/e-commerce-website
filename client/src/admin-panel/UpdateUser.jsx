import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Consumer } from '../store/StoreToken';
import { toast } from 'react-toastify';
import './updateuser.css'; // Import CSS file for styling

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizedToken } = Consumer();
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resp = await fetch(`http://localhost:5005/admin/users/${id}`, {
          method: 'GET',
          headers: {
            Authorization: authorizedToken,
          },
        });
        const resp_data = await resp.json();
        if (resp.ok) {
          setUserData({
            username: resp_data.userGet.username,
            email: resp_data.userGet.email,
          });
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [id, authorizedToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`http://localhost:5005/admin/users/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizedToken,
        },
        body: JSON.stringify(userData),
      });
console.log(resp);
      if (resp.ok) {
        toast.success("User updated successfully");
        navigate('/admin/users');
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="update-user-container">
      <h2>Update User</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;
