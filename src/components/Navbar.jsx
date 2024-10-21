import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Vishwakarma Institute of Information Technology
      </div>
      <ul className="navbar-links">
        <li>Home</li>
        <li>About Us</li>
        <li>Departments</li>
        <li>Admissions</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
