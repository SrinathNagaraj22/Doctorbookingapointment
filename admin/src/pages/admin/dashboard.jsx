import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";


function Dashboard() {
  const { aToken, getDashData, dashData, appointments } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    <div className="container my-5">
      <h2 className="text-light mb-4 text-center"> Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card bg-dark text-light shadow-lg border-0 text-center p-3">
            <h5>Doctors</h5>
            <h2 className="fw-bold">{dashData?.doctors || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-dark text-light shadow-lg border-0 text-center p-3">
            <h5>Patients</h5>
            <h2 className="fw-bold">{dashData?.patients || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-dark text-light shadow-lg border-0 text-center p-3">
            <h5>Appointments</h5>
            <h2 className="fw-bold">{dashData?.appointments || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-dark text-light shadow-lg border-0 text-center p-3">
            <h5>Completed</h5>
            <h2 className="fw-bold">{dashData?.completed || 0}</h2>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="card bg-dark text-light shadow-lg border-0">
        <div className="card-header bg-secondary text-light">
          <h5 className="mb-0">Recent Appointments</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead className="table-secondary text-dark">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Fees</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
  {dashData?.latestAppointments && dashData.latestAppointments.length > 0 ? (
    dashData.latestAppointments.map((appt, index) => (
      <tr key={appt._id || index}>
        <td>{index + 1}</td>
        
        <td>
          <div className="d-flex align-items-center">
            <img
              src={appt.userId?.image || "/default-profile.png"}
              alt="profile"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <div>
              <div>{appt.userId?.name || "N/A"}</div>
              <small>{appt.userId?.email}</small>
            </div>
          </div>
        </td>

        
        <td>{appt.docData?.name || "N/A"}</td>

        
        <td>
          {appt.slotDate} | {appt.slotTime}
        </td>

        
        <td>{appt.amount} INR</td>

        
        <td>
          {appt.cancelled ? (
            <span className="badge bg-danger">Cancelled</span>
          ) : appt.isCompleted ? (
            <span className="badge bg-success">Completed</span>
          ) : (
            <span className="badge bg-secondary">Pending</span>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center py-4 text-muted">
        No Appointments Found
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
