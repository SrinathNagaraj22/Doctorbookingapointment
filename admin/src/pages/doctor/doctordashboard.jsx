import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/doctorcontext";

function Doctordashboard() {
  const { DToken, dashData, getDashData } = useContext(DoctorContext);

  useEffect(() => {
    if (DToken) {
      getDashData();
    }
  }, [DToken]);

  if (!dashData) return <p className="text-light">Loading...</p>;

  return (
    <div className="container mt-4 text-light">
      <h2 className="mb-4">Doctor Dashboard</h2>

      {/* Top Metrics */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="p-3 rounded bg-secondary bg-opacity-25 text-center">
            <h5>Earnings</h5>
            <p className="fs-4">₹{dashData.earning}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="p-3 rounded bg-secondary bg-opacity-25 text-center">
            <h5>Appointments</h5>
            <p className="fs-4">{dashData.appointments}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="p-3 rounded bg-secondary bg-opacity-25 text-center">
            <h5>Patients</h5>
            <p className="fs-4">{dashData.patients}</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments Table */}
      <h4 className="mb-3">Latest Appointments</h4>
      {dashData.latestAppointments.length === 0 ? (
        <p className="text-muted">No recent appointments.</p>
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
              {dashData.latestAppointments.map((appt) => (
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
                    {appt.isCompleted ? (
                      <span className="badge bg-success">Completed</span>
                    ) : appt.cancelled ? (
                      <span className="badge bg-danger">Cancelled</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Pending</span>
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

export default Doctordashboard;
