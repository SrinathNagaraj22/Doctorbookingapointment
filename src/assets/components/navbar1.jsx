import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../../index.css'

function Navbar1() {
  const navigate = useNavigate();
  const [showmenu, setShowmenu] = useState(false);
  const [token, setToken] = useState(false);

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
        {
          token ?
          <div className='position-relative'>
            <i className="bi bi-person-circle fs-2 me-5 profile" onClick={()=>setShowmenu(!showmenu)}></i>
            <div className='hidden-menu' style={{display: showmenu ? 'block' : 'none'}}>
              <p className='' onClick={()=>navigate('/myprofile')}>My Profile</p>
              <p className='' onClick={()=>navigate('/myapointment')}>My apointments</p>
              <p className='' onClick={()=>setToken(false)}>Logout</p>
            </div>
          </div>
          :
          <button type="button" onClick={()=>navigate('/login')} className="btn btn-dark mt-1">Create account</button>
        }
      </div>
    </div>
  )
}

export default Navbar1