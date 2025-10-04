import React from 'react'
import groupimages from '../images/group_profiles.png'
import headerimage from '../images/header_img.png'

function Header() {
  return (
    <div className='container mt-5'>
      <div className='row align-items-center'>
        <div className='col-12 col-md-6 text-center text-md-start mb-4 mb-md-0'>
          <p className='header mb-2'>Book appointment</p>
          <p className='fs-2 mb-4'>with our trusted doctors</p>
          <div className='d-flex align-items-center justify-content-center justify-content-md-start mb-3'>
            <img src={groupimages} alt='groupprofileimage' className='me-3 img-fluid' style={{ maxWidth: "80px" }} />
            <p className='mb-0 fs-5'>Go through the list of specialised doctors and book your appointment</p>
          </div>
          <a href='#Speciality' className='btn btn-primary btn-lg mt-2'>Book appointment</a>
        </div>
        <div className='col-12 col-md-6 text-center'>
          <img className='img-fluid' src={headerimage} alt='headerimage' />
        </div>
      </div>
    </div>
  )
}

export default Header
