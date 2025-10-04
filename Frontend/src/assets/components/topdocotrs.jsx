import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/appcontext.jsx';
import '../../index.css'

function Topdoctors() {
  const navigate = useNavigate();
  const { doctors } = useContext(Appcontext);

  return (
    <div className='container mt-5'>
      <h1 className='text-center'>Top Doctor's</h1>
      <p className='text-center'>
        Simply browse through our expert top doctors and book your appointment
      </p>

      <div className='row mt-4'>
        {doctors.slice(0, 12).map((item, index) => (
          <div key={index} className='col-6 col-md-4 col-lg-3 mb-4'>
            <div onClick={() => navigate(`/apointment/${item._id}`)} className='card doctor-card p-3 shadow-sm h-100 text-center'>
              <img
                src={item.image}
                alt='doctorimage'
                className='img-fluid rounded-circle mx-auto'
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover'
                }}
              />
              <p className='mt-2 text-success'>Available</p>
              <h6 className='mb-1'>{item.name}</h6>
              <p className='text-muted small'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='text-center'>
        <button type='button' onClick={() => { navigate(`/doctors`) }} className='btn btn-primary mt-3'>More</button>
      </div>
    </div>
  )
}

export default Topdoctors
