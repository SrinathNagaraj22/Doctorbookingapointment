import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/doctorcontext";

function Sidebar() {
  const { aToken } = useContext(AdminContext);
  const {DToken} = useContext(DoctorContext)

  return (
    <div className="m-4">
      {aToken && (
        <ul className="list-unstyled">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `d-flex align-items-center mt-5 gap-2 p-2 sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-house-fill"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/allappointments"
              className={({ isActive }) =>
                `d-flex align-items-center mt-4 gap-2 p-2 sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-calendar-event"></i>
              <span>All Appointments</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `d-flex align-items-center mt-4 gap-2 p-2 sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-person-plus-fill"></i>
              <span>Add Doctor</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `d-flex align-items-center mt-4 gap-2 p-2 sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-person-circle"></i>
              <span>Doctor List</span>
            </NavLink>
          </li>
        </ul>
      )}
      {/* Doctor Links */}
      {DToken && (
        <ul className="list-unstyled">
          <li>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `d-flex align-items-center mt-5 gap-2 p-2 sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="bi bi-house-fill"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-appointment"
              className={({ isActive }) =>
                `d-flex align-items-center mt-4 gap-2 p-2 sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="bi bi-calendar-check-fill"></i>
              <span>Appointments</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `d-flex align-items-center mt-4 gap-2 p-2 sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className="bi bi-people-fill"></i>
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
