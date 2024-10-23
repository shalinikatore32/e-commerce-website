import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Consumer } from '../store/StoreToken';
import './profile.css';

const Profile = () => {
  const { authorizedToken } = Consumer();
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5005/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': authorizedToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setFormData(data);
        } else {
          toast.error('Failed to fetch user data');
        }
      } catch (error) {
        toast.error('An error occurred while fetching user data');
      }
    };

    fetchUserData();
  }, [authorizedToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5005/user/update-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorizedToken,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>
        {!isEditing ? (
          <div className="profile-details">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
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
                value={formData.email || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="save-button">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
