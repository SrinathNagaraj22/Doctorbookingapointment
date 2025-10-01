import React from 'react'
import groupimages from '../images/group_profiles.png'
import headerimage from '../images/header_img.png'

function Header() {
  return (
    <div className='d-flex justify-content-center align-items-center m-5 p-4'>
      <div className='me-5'>
        <p className='header mb-2 ms-5 mt-5'>Book appointment</p>
        <p className='fs-1 mb-4 ms-5'>with our trusted doctors</p>
        <div className='d-flex align-items-center mb-3'>
          <img src={groupimages} alt='groupprofileimage' className='me-3 ms-5' />
          <p className='mb-0 fs-4'>Go through the list of specialised doctors and book your appointment</p>
        </div>
        <a href='#Speciality' className='btn btn-primary fs-3 btn-lg ms-5 mt-2'>Book appointment</a>
      </div>
      <div>
        <img className='w-60 h-60 ms-5' src={headerimage} alt='headerimage' />
      </div>
    </div>
  )
}

export default Header