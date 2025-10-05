import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../context/appcontext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

function MyAppointments() {
  const { backendUrl, token, getDoctorsdata } = useContext(Appcontext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
  if (!token) return;

  try {
    const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
      headers: { Authorization: `Bearer ${token}` }, 
    });

    if (data.success) {
      setAppointments(data.appointments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

  const cancelAppointment = async (appointmentid)=>{
    try{

      const { data } = await axios.post(`${backendUrl}/api/user/cancelappointment`, {appointmentid},{
      headers: { Authorization: `Bearer ${token}` }, 
    });

    if(data.success)
    {
      toast.success(data.message)
      getUserAppointments()
      getDoctorsdata()
    }
    else{
      toast.error(data.message)
    }
    }
    catch(error)
    {
      console.log(error)
      toast.error(error.message)

    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="container my-5">
      <h3 className="text-light mb-4 text-center">My Appointments</h3>

      <div className="row g-4">
        {appointments.length === 0 && (
          <p className="text-center">No appointments booked yet.</p>
        )}

        {appointments.map((item, index) => {
          const doctor = item.docData;
          const appointmentDate = new Date(item.date);

          return (
            <div className="col-md-6" key={index}>
              <div className="card bg-dark text-light shadow-lg border-0 h-100">
                <div className="row g-0 align-items-center">
                  <div className="col-md-4 text-center p-3">
                    <img
                      src={doctor.image}
                      alt="doctor"
                      className="img-fluid rounded-circle border border-secondary"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{doctor.name}</h5>
                      <p className="card-text">{doctor.speciality}</p>
                      <p className="mb-1">
                        <strong>Address:</strong>
                      </p>
                      <p className="mb-0 small">{doctor.address?.line1 || doctor.address}</p>
                      <p className="mb-2 small">{doctor.address?.line2 || ""}</p>
                      <p className="text-info mb-3">
                        <span className="fw-bold">Date & Time:</span>{" "}
                        {item.slotDate} | {item.slotTime}
                      </p>
                      <div className="d-flex gap-2">
                        {!item.payment && !item.cancelled && (
                          <button className="btn btn-sm btn-primary">Pay Online</button>
                        )}
                        {!item.cancelled && (
                          <button onClick={()=>cancelAppointment(item._id)} className="btn btn-sm btn-danger">Cancel Appointment</button>
                        )}
                        {item.cancelled && <button className="btn btn-sm btn-danger">Appointment cancelled</button>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyAppointments;
