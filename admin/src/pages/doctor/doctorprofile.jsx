import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/doctorcontext';
import { toast } from 'react-toastify';
import axios from 'axios';

function Doctorprofile() {
  const { DToken, profile, getProfileData, backendUrl } = useContext(DoctorContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    fees: 0,
    available: false
  });

  useEffect(() => {
    if (DToken) {
      getProfileData();
    }
  }, [DToken]);

  useEffect(() => {
    if (profile) {
      setFormData({
        address: profile.address || '',
        fees: profile.fees || 0,
        available: profile.available || false
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

 const handleSave = async () => {
  try {
    const updateData = {
      address: formData.address,
      fees: formData.fees,
      available: formData.available,
    };

    const { data } = await axios.post(
      `${backendUrl}/api/doctor/updateprofile`,
      updateData,
      { headers: { Authorization: `Bearer ${DToken}` } }
    );

    if (data.success) {
      toast.success("Profile updated successfully!");
      setEditMode(false);
      getProfileData(); // refresh profile
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};

  if (!profile) return <p className="text-light">Loading profile...</p>;

  return (
    <div className="container mt-4 text-light">
      <h2 className="mb-4 text-center">My Profile</h2>

      <div className="card bg-dark text-light shadow p-3">
        <div className="d-flex flex-column flex-md-row align-items-center gap-4">
          {/* Profile Image */}
          <div className="text-center">
            <img
              src={profile.image || '/default-avatar.png'}
              alt={profile.name}
              className="rounded-circle mb-2"
              style={{ width: '140px', height: '140px', objectFit: 'cover' }}
            />
            <h4>{profile.name}</h4>
            <p>{profile.email}</p>
          </div>

          {/* Profile Info */}
          <div className="flex-grow-1">
            <h5>Professional Info</h5>
            <p><strong>Speciality:</strong> {profile.speciality}</p>
            <p><strong>Degree:</strong> {profile.degree}</p>
            <p><strong>Experience:</strong> {profile.experience}</p>

            {/* Editable Fields */}
            <div className="mb-2">
              <strong>Address:</strong>{' '}
              {!editMode ? profile.address : (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control form-control-sm text-dark"
                />
              )}
            </div>

            <div className="mb-2">
              <strong>Fees:</strong>{' '}
              {!editMode ? `₹${profile.fees}` : (
                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  className="form-control form-control-sm text-dark"
                />
              )}
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="availableCheck"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="availableCheck">
                Available
              </label>
            </div>

            {/* Edit/Save Buttons */}
            <div className="mt-3">
              {!editMode ? (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Slots Booked */}
        <div className="mt-4">
          <h5>Slots Booked</h5>
          {profile.slots_booked && Object.keys(profile.slots_booked).length > 0 ? (
            <div className="table-responsive">
              <table className="table table-dark table-striped align-middle text-light">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Times</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(profile.slots_booked).map(([date, times]) => (
                    <tr key={date}>
                      <td>{date}</td>
                      <td>{times.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No slots booked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctorprofile;
