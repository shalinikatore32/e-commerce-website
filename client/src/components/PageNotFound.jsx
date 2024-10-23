import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/pagenotfound.css';
function PageNotFound() {
  return (
    <>
    <div className="page-container">
        <h1>
            Oops! 404 Page Not Found</h1>
            <p>
            We're sorry, but the page you're looking 
            for cannot be found. It might have been moved, renamed, or it may no longer exist.
                </p>  
           
            <NavLink  to="/" ><button>Go Home</button>
                </NavLink>  
    </div>
    </>
  )
}

export default PageNotFound
