import React, { useState } from 'react';
import '../styles/login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Consumer } from '../store/StoreToken';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const { storeToken } = Consumer();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(`http://localhost:5005/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res_data = await resp.json();
            if (resp.status === 200) {
                toast.success("Logged in successfully");
                storeToken(res_data.token);
                setUser({ email: '', password: '' });
                navigate('/');
            } else {
                toast.error("Invalid Credentials");
                setUser({ email: '', password: '' });
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login to Your Account</h2>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required 
                    />
                </label>
                <label>
                    Password:
                    <div className="password-container">
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            name="password" 
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required 
                        />
                        <button 
                            type="button" 
                            className="toggle-password" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </label>
                <button type="submit">Login</button>
                <div className="additional-text">
                    <p>Don't have an account? <NavLink to="/register">Sign up here</NavLink></p>
                    <p><NavLink to="/forgot-password">Forgot your password?</NavLink></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
