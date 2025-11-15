import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

function Allapointments() {
  const { aToken, getAllAppointments, appointments, cancelappointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Utility function to calculate age
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="container my-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h3 className="fw-bold text-light"> All Appointments</h3>
      </div>

      {/* Appointments Table */}
      <div className="table-responsive shadow rounded">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead className="table-secondary text-dark">
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Age</th>
              <th>Date & Time</th>
              <th>Doctor</th>
              <th>Fees</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appt, index) => (
                <tr key={appt._id || index}>
                  <td>{index + 1}</td>

                  {/* Patient Column with Image + Name */}
                  <td className="d-flex align-items-center gap-2">
                    <img
                      src={appt.userData?.image || "/default-user.png"}
                      alt="user"
                      className="rounded-circle border border-secondary"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                    <div>
                      <strong className="text-light">{appt.userData?.name || "N/A"}</strong>
                      <div className="small">{appt.userData?.email}</div>
                    </div>
                  </td>

                  {/* Age */}
                  <td>{calculateAge(appt.userData?.dob)}</td>

                  {/* Date & Time */}
                  <td>
                    <span className="badge bg-info text-dark me-1">{appt.slotDate}</span>
                    <span className="badge bg-warning text-dark">{appt.slotTime}</span>
                  </td>

                  {/* Doctor */}
                  <td className="d-flex align-items-center gap-2">
                    <img
                      src={appt.docData?.image || "/default-user.png"}
                      alt="user"
                      className="rounded-circle border border-secondary"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                    <div>
                      <strong className="text-light">{appt.docData?.name || "N/A"}</strong>
                      <div className="small">{appt.docData?.email}</div>
                    </div>
                  </td>

                  

                  {/* Fees */}
                  <td>
                    <span className="text-success fw-bold">{appt.amount} INR</span>
                  </td>

                  {/* Status */}
                  <td>
                    {appt.cancelled ? (
                      <span className="badge bg-danger">Cancelled</span>
                    ) : appt.isCompleted ? (
                      <span className="badge bg-success">Completed</span>
                    ) : (
                      <span className="badge bg-secondary">Pending</span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      {!appt.cancelled &&(<button onClick={()=>cancelappointment(appt._id)} className="btn btn-outline-danger btn-sm">Cancel</button>) }
                      
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-muted">
                  No Appointments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Allapointments;
