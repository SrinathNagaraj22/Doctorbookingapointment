import React from 'react'
import { specialityData } from '../images/assets'
import { Link } from 'react-router-dom'

function Speciality() {
  return (
    <div id='Speciality' className='container mt-5'>
      <h1 className='text-center'>Find by speciality</h1>
      <p className='text-center'>Simply browse through our specialist doctors and book your appointment</p>
      
      <div className='row mt-4'>
        {specialityData.map((item, index) => (
          <div key={index} className='col-6 col-md-4 text-center mb-4'>
            <Link to={`/doctors/${item.speciality}`} className='text-decoration-none text-light'>
              <img 
                src={item.image} 
                alt='specialityimage' 
                className='img-fluid mb-2' 
                style={{ maxWidth: "100px" }} 
              />
              <p>{item.speciality}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Speciality
