import React from 'react'
import ReactDOM from 'react-dom/client'
import AppWrapper from './App'
import './index.css'
import {StoreToken} from './store/StoreToken.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Pbjs1GTG5DwFr04SgZhO3vPep68oHH4TAFd8m7LJjdG0wnEgHXJB3AILHqXqjlEd4p7rzgbdTsMW2SKAcWtBWhb00yPKd1mvA');


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
      
      <StoreToken>
      <Elements stripe={stripePromise}>
        <AppWrapper />
        </Elements>
        <ToastContainer/>
      </StoreToken>
      
       
    </React.StrictMode>
 ,
)
