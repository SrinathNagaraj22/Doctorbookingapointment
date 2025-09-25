import React from 'react'
import { specialityData } from '../images/assets'
import { Link } from 'react-router-dom'

function Speciality() {
  return (
    <div id='Speciality'>
      <h1 className='text-center mt-10'>Find by speciality</h1>
      <p className='text-center mt-3'>Simply browse through our specialist doctors and book ur apointment</p>
      <div className='d-flex justify-content-center align-text-center mt-5 gap-5'>
        {specialityData.map((item, index)=>
        <Link key={index} to={`/doctors/${item.speciality}`}>
        <img src={item.image} alt='specialityimage' />
        <p className='text-center mt-2'>{item.speciality}</p>
        </Link>
        
        )}
      </div>
    </div>
  )
}

export default Speciality
