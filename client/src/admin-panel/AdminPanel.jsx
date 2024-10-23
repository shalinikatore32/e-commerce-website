import React, { useState } from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PhoneIcon from '@mui/icons-material/Phone';
import DvrIcon from '@mui/icons-material/Dvr';
import LogoutIcon from '@mui/icons-material/Logout';
import './adminpanel.css';
import { Consumer } from '../store/StoreToken';

function AdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoading, user } = Consumer();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`admin-panel-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="admin-toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`admin-container ${isSidebarOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li>
              <NavLink to='/admin/dashboard'>
                <span><DashboardIcon /></span>
                <span className="link-text">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/admin/users'>
                <span><GroupIcon /></span>
                <span className="link-text">Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/admin/contacts'>
                <span><PhoneIcon /></span>
                <span className="link-text">Contacts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/admin/orderPlace'>
                <span><DvrIcon /></span>
                <span className="link-text">OrderPlaced</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/logout'>
                <span><LogoutIcon /></span>
                <span className="link-text">Logout</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
