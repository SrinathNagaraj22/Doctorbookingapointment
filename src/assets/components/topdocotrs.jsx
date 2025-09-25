import React from 'react'
import { assets, doctors } from '../images/assets'
import '../../index.css'

function Topdoctors() {
  return (
    <div>
      <div>
        <h1 className='text-center mt-5'>Top Doctor's</h1>
        <p className='text-center'>
          Simply browse through our expert top doctor's and book your appointment
        </p>

        <div className='container'>
          <div className='doctors-grid'>
            {doctors.slice(0, 10).map((item, index) => (
              <div key={index} className='card doctor-card p-3 shadow-sm h-100'>
                <img
                  src={item.image}
                  alt='doctorimage'
                  className='img-fluid rounded-circle mx-auto'
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover'
                  }}
                />
                <p className='mt-3 text-success'>Available</p>
                <h5 className='mb-1'>{item.name}</h5>
                <p className='text-muted'>{item.speciality}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='text-center'>
          <button className='btn btn-primary mt-4'>More</button>
        </div>
      </div>
    </div>
  )
}

export default Topdoctors
