import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './userdata.css'; // Import CSS file for styling
import { Consumer } from '../store/StoreToken';
import { toast } from 'react-toastify';

function UserData() {
  const [users, setUser] = useState([]);

  const { authorizedToken } = Consumer();

  const getAllUsersData = async () => {
    try {
      const resp = await fetch(`http://localhost:5005/admin/users`, {
        method: 'GET',
        headers: {
          Authorization: authorizedToken,
        },
      });
      const resp_data = await resp.json();
      console.log(resp);
      console.log(resp_data.data);

      if (resp.ok) {
        toast.success("User Data Displayed Successfully");
        setUser(resp_data.data);
      } else {
        toast.error("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id, isAdmin) => {
    console.log(id);
    if (isAdmin) {
      return toast.warning("You can't delete yourself");
    }
    try {
      const deleteResp = await fetch(`http://localhost:5005/admin/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizedToken,
        },
      });
      console.log(await deleteResp.json()); 
      if (deleteResp.ok) {
        getAllUsersData();
        toast.success("User Deleted Successfully");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user, index) => {
                const { _id, username, email, isAdmin } = user;
                return (
                  <tr key={index}>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{isAdmin ? 'Admin' : 'User'}</td>
                    <td>
                      <Link to={`/admin/users/${_id}/edit`} className="edit-button">Edit</Link> {/* Use Link component */}
                    </td>
                    <td>
                      <button type='button' className="delete-button" onClick={() => deleteUser(_id, isAdmin)}>Delete</button>
                    </td>
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
