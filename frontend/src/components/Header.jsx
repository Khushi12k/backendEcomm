import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div className='header'>

      <div className="logo">
        <h1>E-commerce</h1>
      </div>

      <div className='list'>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/admin/Login">Admin</Link>
      </div>

    </div>
  )
}

export default Header