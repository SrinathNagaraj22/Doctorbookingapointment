import React, { useContext } from "react";
import { Appcontext } from "../context/appcontext.jsx";

function Myapointment() {
  const { doctors } = useContext(Appcontext);

  return (
    <div className="container my-5">
      <h3 className="text-light mb-4 text-center">My Appointments</h3>

      <div className="row g-4">
        {doctors.slice(0, 2).map((item, index) => (
          <div className="col-md-6" key={index}>
            <div className="card bg-dark text-light shadow-lg border-0 h-100">
              <div className="row g-0 align-items-center">
                <div className="col-md-4 text-center p-3">
                  <img
                    src={item.image}
                    alt="doctor"
                    className="img-fluid rounded-circle border border-secondary"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-muted">{item.speciality}</p>
                    <p className="mb-1">
                      <strong>Address:</strong>
                    </p>
                    <p className="mb-0 small">{item.address.line1}</p>
                    <p className="mb-2 small">{item.address.line2}</p>
                    <p className="text-info mb-3">
                      <span className="fw-bold">Date & Time:</span> 25 July, 2025 | 9:30 AM
                    </p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-primary">Pay Online</button>
                      <button className="btn btn-sm btn-danger">Cancel Appointment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Myapointment;
