import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../index.css';

function Navbar1() {
  const navigate = useNavigate();
  const [showmenu, setShowmenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand fs-4" to="/">
        Five Rupee Multi-Speciality Hospital
      </NavLink>

      {/* Hamburger button for mobile */}
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/doctors">Doctors</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contact</NavLink>
          </li>
        </ul>

        {/* Profile or Account button */}
        <div className="d-flex">
          {token ? (
            <div className="dropdown">
              <i 
                className="bi bi-person-circle fs-3 text-white dropdown-toggle" 
                role="button" 
                id="profileMenu" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              ></i>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileMenu">
                <li><p className="dropdown-item mb-0" onClick={()=>navigate('/myprofile')}>My Profile</p></li>
                <li><p className="dropdown-item mb-0" onClick={()=>navigate('/myapointment')}>My Appointments</p></li>
                <li><p className="dropdown-item mb-0" onClick={()=>{navigate('/login');setToken(false)}}>Logout</p></li>
              </ul>
            </div>
          ) : (
            <button type="button" onClick={()=>navigate('/createaccount')} className="btn btn-outline-light">
              Create Account
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar1;
