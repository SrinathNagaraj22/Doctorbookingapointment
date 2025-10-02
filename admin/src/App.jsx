// App.jsx
import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext.jsx";
import Navbar from "./components/navbar.jsx";
import Login from "./pages/login.jsx";
import Sidebar from "./components/sidebar.jsx";
import { Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./pages/admin/Dashboard.jsx";
import Allapointments from "./pages/admin/Allapointments.jsx";
import Adddoctor from "./pages/admin/adddoctor.jsx";
import Doctorlist from "./pages/admin/doctorlist.jsx";


function App() {
  const { aToken, setAToken, setUserType } = useContext(AdminContext);

  const handleLogout = () => {
    localStorage.removeItem("AToken");
    localStorage.removeItem("userType");
    setAToken("");
    setUserType("");
  };

  return (
    <>
      {aToken ? (
        <div>
          <Navbar onLogout={handleLogout} />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-3">
              <Routes>
                {/* Default route will redirect to dashboard */}
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />

                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/allappointments" element={<Allapointments />} />
                <Route path="/add-doctor" element={<Adddoctor />} />
                <Route path="/doctor-list" element={<Doctorlist />} />

                {/* Catch-all for invalid routes */}
                <Route path="*" element={<h2>Page Not Found</h2>} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
