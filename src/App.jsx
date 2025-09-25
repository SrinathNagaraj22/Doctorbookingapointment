import React from 'react'
import {Route,Routes} from "react-router-dom";
import Home from './assets/pages/home.jsx';
import Contact from './assets/pages/contact.jsx';
import About from './assets/pages/about.jsx';
import Login from './assets/pages/login.jsx';
import Myapointment from './assets/pages/myapointment.jsx';
import Doctors from './assets/pages/doctors.jsx';
import Myprofile from './assets/pages/myprofile.jsx';
import Apointment from './assets/pages/apointment.jsx';
import Navbar1 from './assets/components/navbar1.jsx';
import Createaccount from './assets/pages/createaccount.jsx';
import './index.css'

function App() {
  return (
    <div>
      <Navbar1 />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/myapointment' element={<Myapointment />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:Speciality' element={<Doctors />} />
        <Route path='/myprofile' element={<Myprofile />} />
        <Route path='/apointment/:doctorId' element={<Apointment />} />
        <Route path='/createaccount' element={<Createaccount />} />
        
      </Routes>
    </div>
  )
}

export default App
