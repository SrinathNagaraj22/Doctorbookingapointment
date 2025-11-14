import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext.jsx";
import { DoctorContext } from "./context/doctorcontext.jsx";
import Navbar from "./components/navbar.jsx";
import Sidebar from "./components/sidebar.jsx";
import Login from "./pages/login.jsx";
import { Route, Routes, Navigate } from "react-router-dom";

// Admin pages
import Dashboard from "./pages/admin/Dashboard.jsx";
import Allapointments from "./pages/admin/allapointments.jsx";
import Adddoctor from "./pages/admin/adddoctor.jsx";
import Doctorlist from "./pages/admin/doctorlist.jsx";

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import Doctorprofile from "./pages/doctor/doctorprofile.jsx";
import Doctorappointment from "./pages/doctor/doctorappointment.jsx";

function App() {
  const { aToken, setAToken, setUserType } = useContext(AdminContext);
  const { DToken, setDToken } = useContext(DoctorContext);

  const handleLogout = () => {
    localStorage.removeItem("AToken");
    localStorage.removeItem("DToken");
    localStorage.removeItem("userType");
    setAToken("");
    setDToken("");
    setUserType("");
  };

  return (
    <>
      {aToken || DToken ? (
        <div>
          <Navbar onLogout={handleLogout} />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-3">
              <Routes>
                {/* Admin routes */}
                {aToken && (
                  <>
                    <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                    <Route path="/admin-dashboard" element={<Dashboard />} />
                    <Route path="/allappointments" element={<Allapointments />} />
                    <Route path="/add-doctor" element={<Adddoctor />} />
                    <Route path="/doctor-list" element={<Doctorlist />} />
                  </>
                )}

                {/* Doctor routes */}
                {DToken && (
                  <>
                    <Route path="/" element={<Navigate to="/doctor-dashboard" />} />
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                    <Route path="/doctor-appointment" element={<Doctorappointment />} />
                    <Route path="/doctor-profile" element={<Doctorprofile />} />
                  </>
                )}

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
