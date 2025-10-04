import React from 'react';
import contactimg from '../images/contact_image.png';

function Contact() {
  return (
    <div className='container mt-5'>
      <h1 className='text-center mt-5'>Contact Us</h1>
      
      <div className='row align-items-center mt-5'>
        <div className='col-12 col-md-5 text-center mb-4 mb-md-0'>
          <img className='img-fluid' src={contactimg} alt='contactimage' style={{ maxWidth: "300px" }} />
        </div>
        <div className='col-12 col-md-7'>
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-envelope-at-fill fs-3 me-3"></i>
            <h5 className="mb-0">Fiverupeehospital@gmail.com</h5>
          </div>
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-telephone-fill fs-3 me-3"></i>
            <h5 className="mb-0">+91 9345603506</h5>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-house-check-fill fs-3 me-3"></i>
            <h5 className="mb-0">Erode, Tamilnadu, India</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;
