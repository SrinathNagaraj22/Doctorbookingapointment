// App.jsx
import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext.jsx";
import Navbar from "./components/navbar.jsx";
import Login from "./pages/login.jsx";
import Sidebar from "./components/sidebar.jsx";
import { Route, Routes } from "react-router-dom";


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
          <Navbar />
          <div className="d-flex">
            <Sidebar />
            <div>
            <Routes>
              <Route path = '/' element = '{<></>}' />
              <Route path = '/admin-dashboard' element = '{<Dashboard />}' />
              <Route path = '/allappointments' element = '{<Allapointments />}' />
              <Route path = '/add-doctor' element = '{<Adddoctor />}' />
              <Route path = '/doctor-list' element = '{<Doctorlist />}' />
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
