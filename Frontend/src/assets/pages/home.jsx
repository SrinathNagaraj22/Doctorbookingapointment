import React, { useEffect } from 'react'
import Header from '../components/header'
import Speciality from '../components/speciality'
import Topdoctors from '../components/topdocotrs'
import Infoabouthospital from '../components/infoabouthospital'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

function Home() {
  const location = useLocation();

    useEffect(() => {
    if (location.state?.showToast) {
      toast.error("Please login to book an appointment");
    }
  }, [location]);
  return (
    
    <div>
      <Header />
      <Speciality />
      <Topdoctors />
      <Infoabouthospital />
      <Footer />
    </div>
  )
}

export default Home
