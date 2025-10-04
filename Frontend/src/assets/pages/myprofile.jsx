import React, { useState } from "react";

function Myprofile() {
  const [userData, setUserData] = useState({
    name: "Sivasamy",
    email: "sivasamy@example.com",
    phone: "9876543210",
    dob: "1995-06-15",
    gender: "Male",
    address: "123, Anna Nagar, Chennai, India",
    photo: "https://via.placeholder.com/150" 
  });

  const [isEditing, setIsEditing] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData({ ...userData, photo: imageUrl });
    }
  };

  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="container my-5">
      <div className="card bg-dark text-light shadow-lg border-0 p-4">
        <h3 className="mb-4 text-center">My Profile</h3>

        
        <div className="text-center mb-4">
          <img
            src={userData.photo}
            alt="Profile"
            className="rounded-circle shadow"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          {isEditing && (
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="form-control form-control-sm bg-secondary text-light border-0"
              />
            </div>
          )}
        </div>

        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="form-control bg-secondary text-light border-0"
              />
            ) : (
              <p className="form-control bg-secondary text-light border-0">{userData.name}</p>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Email ID</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="form-control bg-secondary text-light border-0"
              />
            ) : (
              <p className="form-control bg-secondary text-light border-0">{userData.email}</p>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="form-control bg-secondary text-light border-0"
              />
            ) : (
              <p className="form-control bg-secondary text-light border-0">{userData.phone}</p>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                className="form-control bg-secondary text-light border-0"
              />
            ) : (
              <p className="form-control bg-secondary text-light border-0">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="form-select bg-secondary text-light border-0"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <p className="form-control bg-secondary text-light border-0">{userData.gender}</p>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="form-control bg-secondary text-light border-0"
                rows="2"
              />
            ) : (
              <p className="form-control bg-secondary text-light border-0">{userData.address}</p>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            className={`btn ${isEditing ? "btn-success" : "btn-primary"}`}
            onClick={handleEditToggle}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Myprofile;
