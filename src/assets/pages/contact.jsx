import React from 'react';
import contactimg from '../images/contact_image.png';

function Contact() {
  return (
    <div className='container mt-5'>
      <h1 className='text-center mt-5'>Contact Us</h1>
      <div className='d-flex justify-content-center align-items-center mt-5 gap-5'>
        <img className='w-25 h-25' src={contactimg} alt='contactimage' />
        
        <div>
          {/* Email */}
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-envelope-at-fill fs-3 me-3"></i>
            <h2 className="mb-0">sigklgjasio@gmail.com</h2>
          </div>

          {/* Phone */}
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-telephone-fill fs-3 me-3"></i>
            <h2 className="mb-0">+91 9345603506</h2>
          </div>

          {/* Address */}
          <div className="d-flex align-items-center">
            <i className="bi bi-house-check-fill fs-3 me-3"></i>
            <h2 className="mb-0">Erode, Tamilnadu, India</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;
