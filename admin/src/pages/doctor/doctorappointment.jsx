import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/doctorcontext";
import axios from "axios";
import { toast } from "react-toastify";

function Doctorappointment() {
  const { DToken, appointment, getAppointments, backendUrl, completeappointment } = useContext(DoctorContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (DToken) {
      getAppointments();
    }
  }, [DToken]);

  

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-light">My Appointments</h2>

      {appointment.length === 0 ? (
        <p className="text-muted">No appointments yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle text-light">
            <thead className="table-dark">
              <tr>
                <th>Patient</th>
                <th>Email</th>
                <th>Slot Date</th>
                <th>Slot Time</th>
                <th>Fees</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
  {appointment
    .slice() // create a shallow copy to avoid mutating state
    .sort((a, b) => (a.isCompleted ? 1 : -1)) // pending first, completed last
    .map((appt) => (
      <tr key={appt._id} className="bg-secondary bg-opacity-10">
        <td className="d-flex align-items-center">
          <img
            src={appt.userId?.image || "/default-avatar.png"}
            alt={appt.userId?.name || "Patient"}
            className="rounded-circle me-2"
            style={{ width: "35px", height: "35px", objectFit: "cover" }}
          />
          <span>{appt.userId?.name || "Unknown"}</span>
        </td>
        <td>{appt.userId?.email || "N/A"}</td>
        <td>{appt.slotDate}</td>
        <td>{appt.slotTime}</td>
        <td>₹{appt.amount}</td>
        <td>
          {appt.cancelled ? (
            <span className="badge bg-danger">Cancelled</span>
          ) : appt.isCompleted ? (
            <span className="badge bg-success">Completed</span>
          ) : (
            <button
              className="btn btn-sm btn-success"
              disabled={loading}
              onClick={() => completeappointment(appt._id)}
            >
              Mark as Completed
            </button>
          )}
        </td>
      </tr>
    ))}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default Doctorappointment;
