import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { Consumer } from '../store/StoreToken';
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

function Dashboard() {
  const [userRoles, setUserRoles] = useState([]);
  const { authorizedToken } = Consumer();

  const fetchDashboardData = async () => {
    try {
      const resp = await fetch(`http://localhost:5005/admin/users`, {
        method: 'GET',
        headers: {
          Authorization: authorizedToken,
        },
      });
      const data = await resp.json();

      if (resp.ok) {
        const roleCounts = data.data.reduce((acc, user) => {
          acc[user.isAdmin ? 'Admin' : 'User'] = (acc[user.isAdmin ? 'Admin' : 'User'] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.keys(roleCounts).map(role => ({
          name: role,
          value: roleCounts[role]
        }));

        setUserRoles(formattedData);
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="stats-container">
        {userRoles.map((role, index) => (
          <div key={index} className="stat-box">
            <h3>{role.name}</h3>
            <p>{role.value}</p>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <div className="chart-box">
          <h3>User Roles Distribution</h3>
          <PieChart width={600} height={400}>
            <Pie
              data={userRoles}
              cx={300}
              cy={200}
              labelLine={false}
              label
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {userRoles.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="chart-box">
          <h3>Number of Admins and Users</h3>
          <BarChart
            width={600}
            height={400}
            data={userRoles}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
