import React, { useState } from 'react';
import { Navigate, NavLink, Outlet, Link } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar } from '@mui/material';
import './userdashboard.css';
import { Consumer } from '../store/StoreToken';

function UserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { user } = Consumer();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="headline">
        <div className="headline-text">Latest News: Welcome to the User Dashboard! Stay tuned for updates...</div>
        <div className="avatar-container" onClick={toggleProfileDropdown}>
          <Avatar className="avatar" src="/path/to/avatar.jpg" alt="User Avatar" />
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <ul>
                <li>
                  <NavLink to='/user/profile'>Profile</NavLink>
                </li>
                <li>
                  <NavLink to='/logout'>Logout</NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={`user-dashboard-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <button className="user-toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
        <div className={`user-container ${isSidebarOpen ? 'open' : ''}`}>
          <nav>
            <ul>
              <li>
                <NavLink to='/user/dashboard'>
                  <span><DashboardOutlinedIcon /></span>Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to='/user/profile'>
                  <span><PersonOutlineOutlinedIcon /></span>Profile
                </NavLink>
              </li>
              <li>
                <NavLink to='/user/history'>
                  <span><HistoryOutlinedIcon /></span>History
                </NavLink>
              </li>
              <li className="dropdown">
                <div className="dropdown-toggle" onClick={toggleSettingsDropdown}>
                  <span><SettingsOutlinedIcon /></span>Settings <ExpandMoreIcon />
                </div>
                {isSettingsDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={`/user/change-password/${user._id}/edit`}>Change Password</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink to='/logout'>
                  <span><LogoutIcon /></span>Logout
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="user-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
