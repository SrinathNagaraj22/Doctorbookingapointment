import React from 'react'
import Header from '../components/header'
import Speciality from '../components/speciality'
import Topdoctors from '../components/topdocotrs'
import Infoabouthospital from '../components/infoabouthospital'
import Footer from '../components/footer'

function Home() {
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
