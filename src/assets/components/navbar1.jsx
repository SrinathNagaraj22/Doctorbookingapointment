import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../index.css'

function Navbar1() {
  return (
    <div className='style-none d-flex m-5 align-items-center'>
      <p className='fs-2'>Five rupee Multi-Speciality Hospital</p>
      <ul className='d-flex justify-content-around align-items-center w-50  ms-5 mb-0' style={{ listStyleType: 'none' }}>
        <NavLink to="/">
        <li>Home</li>
        <hr />
        </NavLink>
        <NavLink to="/about">
        <li>About</li>
        <hr />
        </NavLink>
        <NavLink to="/doctors">
        <li>Doctors</li>
        <hr />
        </NavLink>
        <NavLink to="/contact">
        <li>Contact</li>
        <hr />
        </NavLink>
      </ul>
      <div className="ms-auto">
        <button type="button" className="btn btn-dark mt-1">Create account</button>
      </div>
    </div>
  )
}

export default Navbar1