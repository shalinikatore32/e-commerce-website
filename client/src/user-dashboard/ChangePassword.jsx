import React, { useState, useEffect } from 'react';
import './changepassword.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Consumer } from '../store/StoreToken';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authorizedToken } = Consumer();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    console.log('User ID:', id);
    console.log('Authorized Token:', authorizedToken);
  }, [id, authorizedToken]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      try {
        const response = await fetch(`http://localhost:5005/user/update-pass/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizedToken,
          },
          body: JSON.stringify({ password: newPassword }),
        });

        if (response.ok) {
          toast.success("Password Changed Successfully");
          navigate('/user/passSuccess')
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message}`);
        }
      } catch (error) {
        toast.error("Something went wrong, please try again.");
      }
    } else {
      toast.error("New Password and Confirm New Password do not match");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange}>
        <div className="form-group">
          <label htmlFor="current-password">Current Password</label>
          <input
            type="password"
            id="current-password"
            name='currentPassword'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            name='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-new-password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-new-password"
            name='confirmNewPassword'
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="change-password-button">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
