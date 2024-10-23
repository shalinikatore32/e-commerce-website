import React, { useState } from 'react';
import '../styles/menus.css';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
const Menus = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const menuItems = [
        { category: 'Coffee', items: [
            { name: 'Espresso', price: 3.00 },
            { name: 'Americano', price: 3.50 },
            { name: 'Latte', price: 4.00 },
            { name: 'Cappuccino', price: 4.00 },
            { name: 'Mocha', price: 4.50 },
        ]},
        { category: 'Tea', items: [
            { name: 'Green Tea', price: 3.00 },
            { name: 'Black Tea', price: 2.50 },
            { name: 'Herbal Tea', price: 3.00 },
            { name: 'Chai Latte', price: 4.00 },
        ]},
        { category: 'Pastries', items: [
            { name: 'Croissant', price: 2.50 },
            { name: 'Muffin', price: 3.00 },
            { name: 'Scone', price: 3.00 },
            { name: 'Cinnamon Roll', price: 3.50 },
        ]},
    ];

    

    const filteredMenuItems = menuItems.map(section => ({
        category: section.category,
        items: section.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    }));

    return (
        <div className="menu-book-container">
            <h1>Our Café Menu</h1>
           {/* <SearchIcon className='search-icon'/> */}
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            {filteredMenuItems.map((section, index) => (
                <div className="menu-section" key={index}>
                    <h2>{section.category}</h2>
                    <ul>
                        {section.items.length > 0 ? (
                            section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    {item.name} - ${item.price.toFixed(2)}
                                    <NavLink to='/order' product={item.name} ><button >Order</button></NavLink>
                                </li>
                            ))
                        ) : (
                            <li>No items found</li>
                        )}
                    </ul>
                </div>
            ))}
            <div className="order-summary">
                <h2>Order Summary</h2>
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>
                            {order.quantity} x {order.item} - ${(order.price * order.quantity).toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Menus;
