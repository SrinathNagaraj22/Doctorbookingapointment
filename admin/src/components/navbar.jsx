// components/Navbar.jsx
import React, { useContext } from "react";
import { AdminContext } from "../context/admincontext.jsx";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/doctorcontext.jsx";

function Navbar() {
  const { userType, aToken, setAToken } = useContext(AdminContext);
  const {DToken, setDToken} = useContext(DoctorContext)
  const navigate = useNavigate();

  const logout = () => {
  // Clear all tokens regardless of user type
  if (aToken) {
    setAToken("");
  }
  if (DToken) {
    setDToken("");
  }

  // Remove from localStorage
  localStorage.removeItem("AToken");
  localStorage.removeItem("DToken");
  localStorage.removeItem("userType");
  localStorage.removeItem("docId");

  // Navigate to home/login page
  navigate("/");
};


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
