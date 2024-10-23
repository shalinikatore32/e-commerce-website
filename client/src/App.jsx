import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Navbar from './nav-component/Navbar';
import Registration from './components/Registration';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import OrderProduct from './components/OrderProduct';
import Logout from './components/Logout';
import ServiceCard from './components/Service';
import ContactData from './admin-panel/ContactData';
import UserData from './admin-panel/UserData';
import AdminPanel from './admin-panel/AdminPanel';
import Dashboard from './admin-panel/Dashboard';
import './App.css';
import UpdateUser from './admin-panel/UpdateUser';
import OrderPlaced from './admin-panel/OrderPlaced';
import History from './components/History';
import UserDashboard from './user-dashboard/UserDashboard';
import UserDashboardPage from './user-dashboard/UserDashboardPage';
import ChangePassword from './user-dashboard/ChangePassword';
import PassChangeSuccess from './user-dashboard/PassChangeSuccess';
import PaymentSuccess from './components/PaymentSuccess';
import Profile from './user-dashboard/Profile';
import ForgotPassword from './components/ForgotPassword';


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserRoute=location.pathname.startsWith('/user');

  return (
    <>
      {!isAdminRoute && !isUserRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registration />} />
        <Route path='/service' element={<ServiceCard />} />
        <Route path='/order' element={<OrderProduct />} />
        <Route path='/success' element={<PaymentSuccess/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/logout' element={<Logout />} />
        
        <Route path='/admin' element={<AdminPanel />} >
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users' element={<UserData />} />
          <Route path='contacts' element={<ContactData />} />
          <Route path="users/:id/edit" element={<UpdateUser />} />
          <Route path='orderPlace' element={<OrderPlaced />} />
          <Route path='logout' element={<Logout />} />
        </Route>
        
        <Route path='/user' element={<UserDashboard/>}>
          <Route index element={<UserDashboardPage/>}/>
          <Route path='dashboard' element={<UserDashboardPage/>}/>
          <Route path='history' element={<History/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='change-password/:id/edit' element={<ChangePassword/>}/>
          <Route path='passSuccess' element={<PassChangeSuccess/>}/>
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {!isAdminRoute && !isUserRoute && <Footer />}
    </>
  );
};

const AppWrapper = () => (
 
    <Router>
      <App />
    </Router>
 
  
);

export default AppWrapper;
