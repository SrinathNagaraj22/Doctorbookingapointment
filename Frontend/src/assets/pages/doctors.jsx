import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Appcontext } from '../context/appcontext.jsx'

function Doctors() {

  const { Speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [activeSpec, setActiveSpec] = useState("")   
  const navigate = useNavigate()
  
  const { doctors } = useContext(Appcontext)

  const applyfilter = () => {
    if (Speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === Speciality))
      setActiveSpec(Speciality)
    } else {
      setFilterDoc(doctors)
      setActiveSpec("")
    }
  }

  const applyfilterWithSpec = (spec) => {
    setActiveSpec(spec)
    if (spec) {
      setFilterDoc(doctors.filter(doc => doc.speciality === spec))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyfilter()
  }, [doctors, Speciality])

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist"
  ]

  return (
    <div className="container py-5 bg-dark text-light">
      <h2 className="text-center mb-4">Browse through the doctors specialist</h2>
      <div className="row mb-4">
        <div className="col d-flex flex-wrap justify-content-center gap-3">
          {specialities.map((spec, idx) => (
            <span
              key={idx}
              className={`badge p-2 ${activeSpec === spec ? "bg-primary" : "bg-secondary"}`}
              style={{ cursor: "pointer", minWidth: "140px", textAlign: "center" }}
              onClick={() => applyfilterWithSpec(spec)}
            >
              {spec}
            </span>
          ))}
          <span
            className={`badge p-2 ${activeSpec === "" ? "bg-primary" : "bg-secondary"}`}
            style={{ cursor: "pointer", minWidth: "100px", textAlign: "center" }}
            onClick={() => applyfilterWithSpec("")}
          >
            Show All
          </span>
        </div>
      </div>
      <div className="row g-4">
        {filterDoc.map((item, index) => (
          <div key={index} className="col-md-4 col-lg-3">
            <div 
              className="card doctor-card bg-dark text-light border-0 shadow-sm text-center h-100"
              onClick={() => navigate(`/apointment/${item._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body d-flex flex-column align-items-center">
                <img
                  src={item.image}
                  alt="doctorimage"
                  className="rounded-circle mb-3"
                  style={{
                    width: '140px',
                    height: '140px',
                    objectFit: 'cover'
                  }}
                />
                <p className="text-success mb-1">Available</p>
                <h5 className="card-title mb-1">{item.name}</h5>
                <p className="text-muted">{item.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors
