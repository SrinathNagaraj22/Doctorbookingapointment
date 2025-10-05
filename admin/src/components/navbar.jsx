// components/Navbar.jsx
import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { userType, aToken, setAToken } = useContext(AdminContext);
  
  const navigate = useNavigate();

  const logout = ()=>{
    navigate('/')
    if (aToken) {
    setAToken("");                 
    localStorage.removeItem("AToken");
    localStorage.removeItem("userType"); 
  }
}

  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <div>
        <h1>Fiveruppee MultiSpeciality Hospital</h1>
        <p className="fs-3">{userType || "Doctor"}</p>
        </div>
    <button onClick={logout} type="button" className="btn btn-dark">Logout</button>
    </div>
    
  );
}

export default Navbar;
