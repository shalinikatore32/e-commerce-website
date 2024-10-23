import React, { useEffect, useState } from 'react';
import { Consumer } from '../store/StoreToken';
import { toast } from 'react-toastify';

function ContactData() {
  const [contacts, setContacts] = useState([]);
  const { authorizedToken } = Consumer();

  const getAllContacts = async () => {
    try {
      const response = await fetch(`http://localhost:5005/admin/contacts`, {
        method: 'GET',
        headers: {
          Authorization: authorizedToken,
        },
      });
      const responseData = await response.json();
      console.log(responseData.contactData);

      if (response.ok) {
        toast.success("Contact Data Fetched Successfully");
        setContacts(responseData.contactData);
      } else {
        toast.error("No contacts found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  // Delete user contacts detail
const deleteContact=async (id)=>{
  try {
    const contactDelete=await fetch(`http://localhost:5005/admin/contacts/delete/${id}`,{
      method:'DELETE',
      headers:{
        Authorization:authorizedToken,
      }
     
    });
    if(contactDelete.ok){
      getAllContacts();
      toast.success("contact  deleted successfully");
    }
  } catch (error) {
    console.log(error);
  }
}


  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="user-data-container">
      <h2>Contact Data</h2>
      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(contacts) && contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.fname}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  <button type='button' className="delete-button" onClick={()=>deleteContact(contact._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactData;
