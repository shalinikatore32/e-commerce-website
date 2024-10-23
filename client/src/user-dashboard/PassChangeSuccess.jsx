import React from 'react';
import './passSuccess.css'; // You can style this component as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const PassChangeSuccess = () => {
  return (
    <div className="password-change-success-container">
      <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
      <h2>Password Changed Successfully!</h2>
      <p>Your password has been updated. You can now use your new password to log in.</p>
      <button><NavLink to='/logout'>Go to login page</NavLink></button>
    </div>
  );
};

export default PassChangeSuccess;
