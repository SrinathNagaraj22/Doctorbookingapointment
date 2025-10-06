import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './assets/pages/home.jsx';
import Contact from './assets/pages/contact.jsx';
import About from './assets/pages/about.jsx';
import Login from './assets/pages/login.jsx';
import Myapointment from './assets/pages/myapointment.jsx';
import Doctors from './assets/pages/doctors.jsx';
import Myprofile from './assets/pages/myprofile.jsx';
import Apointment from './assets/pages/apointment.jsx';
import Navbar1 from './assets/components/navbar1.jsx';
import './index.css';
import Loginorcreateaccount from './assets/pages/login.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './assets/components/protectedroute.jsx';

function App() {
  return (
    <>
      <Navbar1 />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Loginorcreateaccount />} />
        <Route path='/createaccount' element={<Loginorcreateaccount />} />

        {/* Protected Routes */}
        <Route 
          path='/myapointment' 
          element={
            <ProtectedRoute>
              <Myapointment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/doctors' 
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/doctors/:Speciality' 
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/myprofile' 
          element={
            <ProtectedRoute>
              <Myprofile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/apointment/:docId' 
          element={
            <ProtectedRoute>
              <Apointment />
            </ProtectedRoute>
          } 
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
