import React, { useContext, useEffect, useState } from 'react'
import { Appcontext } from '../context/appcontext.jsx'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(Appcontext)
  const [relDoc, setRelDoc] = useState([])
  const navigate = useNavigate()

  
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filtered = doctors.filter(
        doc => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(filtered)
    }
  }, [doctors, speciality, docId])

  if (relDoc.length === 0) return null 

  return (
    <div className="mt-4">
      <h4 className="text-light mb-4 text-center">Related Doctors</h4>
      <div className="row g-3">
        {relDoc.map((doc, idx) => (
          <div
            key={idx}
            className="col-md-4 col-sm-6"
            onClick={() => navigate(`/apointment/${doc._id}`)}
          >
            <div className="relateddoctorimage card bg-dark text-light h-100 shadow-sm">
              <img
                src={doc.image}
                alt={doc.name}
                className="card-img-top"
                style={{ width : '100%' , height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title mb-1">Name: {doc.name}</h5>
                <p className="card-text mb-1">Degree: {doc.degree}</p>
                <p className=" mb-1">Specialist: {doc.speciality}</p>
                <p className='mb-1'>Fees: {doc.fees}<span className='text-success'> INR</span> </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
