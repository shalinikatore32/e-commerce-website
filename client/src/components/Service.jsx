import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/servicecard.css';
import { Consumer } from '../store/StoreToken';

const ServiceCard = () => {
  const { service, isLoggedin } = Consumer();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const passData = (data) => {
    if (isLoggedin) {
      navigate('/order', { state: { data } });
    } else {
      navigate('/login');
    }
  };

  const filteredService = service.filter((data) =>
    data.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-icon">&#128269;</span>
      </div>

      <div className="card-container">
        {filteredService.map((data, index) => {
          const { category, product_name, product_price, product_description, image } = data;
          return (
            <div className="card" key={index}>
              <img src={image} alt={`Product: ${product_name}`} className="product-image" />
              <h3>{product_name}</h3>
              <h4 className="price">{`$${product_price}`}</h4>
              <p className="description">{product_description}</p>
              <button type='button' onClick={() => passData(data)}>
                Place Order
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ServiceCard;
