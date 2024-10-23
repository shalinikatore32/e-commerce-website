import React, { useState } from 'react';
import '../styles/registration.css';
import { useNavigate } from 'react-router-dom';
import { Consumer } from '../store/StoreToken';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

function Registration() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { storeToken } = Consumer();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const resp = await fetch(`http://localhost:5005/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const resp_data = await resp.json();
            if (resp.ok) {
                toast.success("Successfully Registered");
                storeToken(resp_data.token);
                navigate('/login');
            } else if (resp.status === 409) {
                toast.error("User already exists");
            } else {
                toast.error(resp_data.extraDetails ? resp_data.extraDetails : resp_data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="registration-form">
                <h2>Create Your Account</h2>
                <label>
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    Username:
                    <input 
                        type="text" 
                        name="username" 
                        value={user.username} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={user.email} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    Password:
                    <input 
                        type="password" 
                        name="password" 
                        value={user.password} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    <FontAwesomeIcon icon={faLockOpen} className="input-icon" />
                    Confirm Password:
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={user.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <button type="submit">Register</button>
                <div className="additional-text">
                    <p>Already have an account? <a href="/login">Login here</a></p>
                </div>
            </form>
        </div>
    );
}

export default Registration;
