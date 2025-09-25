import React from 'react'
import aboutimage from '../images/about_image.png'

function About() {
  return (
    <div className='container'>
      <h1 className='text-center mb-5'>About Us</h1>
      <div className='row align-items-start'>
        <div className='col-md-5 text-center'>
          <img src={aboutimage} alt='aboutimage' className='img-fluid w-75 mb-4' />
        </div>
        <div className='col-md-7'>
          <p>
            Five Rupee Multi-Speciality Hospital is dedicated to providing world-class healthcare at an affordable cost for every patient.
            We believe that quality treatment should never be a privilege but a right for all.
            With a team of highly skilled doctors, nurses, and healthcare professionals, we offer a wide range of medical services under one roof.
          </p>
          <div className="my-3"></div>
          <p>
            Our hospital is equipped with modern diagnostic tools, advanced surgical equipment, and state-of-the-art facilities.
            We focus not only on treating illnesses but also on preventive care and overall wellness.
            Our departments cover cardiology, orthopedics, neurology, pediatrics, general medicine, and more.
            We take pride in maintaining the highest standards of hygiene and patient safety.
            Every patient is treated with dignity, compassion, and personalized attention.
          </p>
          <div className="my-3"></div>
          <p>
            Our motto is simple yet powerful: Affordable Care, Excellent Treatment, Health for All
          </p>
          <h2 className="mt-4">Vision of the hospital</h2>
          <p className="fst-italic">
            “To be a trusted healthcare institution that delivers world-class, affordable, and compassionate medical services, ensuring that every individual — regardless of background or financial status — has access to quality healthcare, while continuously innovating and promoting wellness in the community.”
          </p>
        </div>
      </div>
    </div>
  )
}

export default About