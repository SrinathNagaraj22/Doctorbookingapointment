import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Appcontext } from '../context/context'
import RelatedDoctors from '../components/relateddoctors'

function Apointment() {
  const { docId } = useParams()
  const { doctors } = useContext(Appcontext)
  const [docInfo, setDocInfo] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ]

  const [next7Days, setNext7Days] = useState([])
  useEffect(() => {
    const today = new Date()
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(today.getDate() + i)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
      days.push({ dayName, date: date.toISOString().split('T')[0] })
    }
    setNext7Days(days)
  }, [])
  useEffect(() => {
    if (doctors.length > 0 && docId) {
      const foundDoc = doctors.find(doc => String(doc._id) === String(docId))
      setDocInfo(foundDoc)
    }
  }, [doctors, docId])

  return docInfo && (
    <div className="container my-5">
      <div className="card bg-dark text-light shadow-lg border-0">
        <div className="row g-0">
          <div className="col-md-4 d-flex justify-content-center align-items-center p-3">
            <img
              src={docInfo.image}
              alt="doctorimage"
              className="img-fluid rounded shadow"
              style={{ height: "300px", objectFit: "cover", width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{docInfo.name}</h3>
              <p className="card-text mb-1"><strong>Degree:</strong> {docInfo.degree}</p>
              <p className="card-text mb-1"><strong>Speciality:</strong> {docInfo.speciality}</p>
              <button className="btn btn-outline-light mb-3">
                {docInfo.experience} Years Experience
              </button>
              <p className="card-text">{docInfo.about}</p>
              <h5 className="mt-3">
                Appointment Fees: <span className="text-success">{docInfo.fees} INR</span>
              </h5>
            </div>
          </div>
        </div>
        <div className="card-body border-top mt-3">
          <h4 className="mb-3">Book Appointment</h4>
          <div className="mb-3">
            <label className="form-label">Select Day</label>
            <div className="d-flex flex-wrap gap-2">
              {next7Days.map((day, idx) => (
                <button
                  key={idx}
                  className={`btn btn-sm ${selectedDate === day.date ? "btn-warning text-dark" : "btn-outline-light"}`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  {day.dayName} <br /> {day.date.split('-').reverse().join('-')}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Select Time Slot</label>
            <div className="d-flex flex-wrap gap-2">
              {timeSlots.map((slot, idx) => (
                <button
                  key={idx}
                  className={`btn btn-sm ${selectedSlot === slot ? "btn-warning text-dark" : "btn-outline-light"}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <button
            className="btn btn-success mt-3"
            disabled={!selectedDate || !selectedSlot}
            onClick={() => alert(`Appointment booked on ${selectedDate} at ${selectedSlot}`)}
          >
            Confirm Appointment
          </button>
        </div>
      </div>
      {/* listing related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Apointment
