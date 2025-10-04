import React, { useContext, useState, useEffect } from "react";
import { Appcontext } from "../context/appcontext";
import axios from "axios";
import { toast } from "react-toastify";

function Myprofile() {
  const { userdata, setUserdata, backendUrl } = useContext(Appcontext);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(`${backendUrl}/api/user/getprofile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setUserdata(data.userData); 
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [backendUrl, setUserdata]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setUserdata({ ...userdata, image: imageUrl });
    }
  };
  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const formData = new FormData();
        formData.append("userid", userdata._id);
        formData.append("name", userdata.name || "");
        formData.append("phone", userdata.phone || "");
        formData.append("dob", userdata.dob || "");
        formData.append("gender", userdata.gender || "");
        formData.append("address", userdata.address || "");
        if (imageFile) formData.append("image", imageFile);

        const { data } = await axios.post(`${backendUrl}/api/user/updateprofile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (data.success) {
          setUserdata((prev) => ({ ...prev, ...data.updatedData }));
          toast.success(data.message)
        } else {
          alert(data.message || "Failed to update profile.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error(data.message)
      }
    }

    setIsEditing(!isEditing);
  };

  return (
    userdata && (
      <div className="container my-5">
        <div className="card bg-dark text-light shadow-lg border-0 p-4">
          <h3 className="mb-4 text-center">My Profile</h3>

          <div className="text-center mb-4">
            <img
              src={userdata.image || "/default-avatar.png"}
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
                  value={userdata.name || ""}
                  onChange={handleChange}
                  className="form-control bg-secondary text-light border-0"
                />
              ) : (
                <p className="form-control bg-secondary text-light border-0">{userdata.name}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Email ID</label>
              <p className="form-control bg-secondary text-light border-0">{userdata.email}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={userdata.phone || ""}
                  onChange={handleChange}
                  className="form-control bg-secondary text-light border-0"
                />
              ) : (
                <p className="form-control bg-secondary text-light border-0">{userdata.phone}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={userdata.dob || ""}
                  onChange={handleChange}
                  className="form-control bg-secondary text-light border-0"
                />
              ) : (
                <p className="form-control bg-secondary text-light border-0">{userdata.dob}</p>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={userdata.gender || ""}
                  onChange={handleChange}
                  className="form-select bg-secondary text-light border-0"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p className="form-control bg-secondary text-light border-0">{userdata.gender}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Address</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={userdata.address || ""}
                  onChange={handleChange}
                  className="form-control bg-secondary text-light border-0"
                  rows="2"
                />
              ) : (
                <p className="form-control bg-secondary text-light border-0">{userdata.address}</p>
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
    )
  );
}

export default Myprofile;
