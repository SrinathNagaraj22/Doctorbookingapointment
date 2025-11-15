import React, { useContext, useState } from "react";
import upload_area from "../../assets/images/upload_area.svg";

import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/admincontext";

function Adddoctor() {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [address, setAddress] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) return toast.error("Image not selected");

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", address);

      const token = aToken || localStorage.getItem("AToken");
      if (!token) return toast.error("Admin token missing. Please login again.");

      const { data } = await axios.post(`${backendUrl}/api/admin/addDoctor`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("");
        setFees("");
        setAbout("");
        setSpeciality("");
        setDegree("");
        setAddress("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding doctor");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="container mt-4 p-5 border rounded shadow">
      <h3 className="text-center mb-4">Add Doctor</h3>

      <div className="row">
        {/* Upload Section */}
        <div className="col-md-4 text-center mb-4">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : upload_area}
              alt="Upload Area"
              className="img-fluid mb-2"
              style={{ width: "120px", cursor: "pointer" }}
            />
          </label>
          <input
            id="doc-img"
            type="file"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p>Upload doctor picture</p>
        </div>

        {/* Form Fields */}
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Doctor Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Doctor Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Doctor Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Experience</label>
              <select
                className="form-select"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              >
                <option value="">Select Experience</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1}year`}>
                    {i + 1} year
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Fees</label>
              <input
                type="number"
                className="form-control"
                placeholder="Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Speciality</label>
              <select
                className="form-select"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                required
              >
                <option value="">Select Speciality</option>
                <option value="General physician">General physician</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatricians">Pediatrician</option>
                <option value="Dermatologist">Dermatologist</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Education</label>
              <input
                type="text"
                className="form-control"
                placeholder="Degree / Education"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">About Doctor</label>
        <textarea
          className="form-control"
          placeholder="Write about doctor"
          rows={4}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-dark px-4">
          Add Doctor
        </button>
      </div>
    </form>
  );
}

export default Adddoctor;
