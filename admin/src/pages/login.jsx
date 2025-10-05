import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { DoctorContext } from "../context/doctorcontext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [state, setState] = useState("ADMIN"); // ADMIN or DOCTOR
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, setUserType, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const url =
        state === "ADMIN"
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctor/login`;

      const { data } = await axios.post(url, { email, password });

      if (data.success) {
        if (state === "ADMIN") {
          localStorage.setItem("AToken", data.token);
          localStorage.setItem("userType", "ADMIN");
          setAToken(data.token);
          setUserType("ADMIN");
          toast.success("Admin login successful!");
        } else {
          localStorage.setItem("DToken", data.token);
          localStorage.setItem("userType", "DOCTOR");
          setDToken(data.token);
          localStorage.setItem("docId", data.docId);
          setUserType("DOCTOR");
          toast.success("Doctor login successful!");
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <form
        onSubmit={onSubmitHandler}
        className="p-4 rounded shadow bg-dark text-light"
        style={{ minWidth: "350px" }}
      >
        <h3 className="text-center mb-4">{state} LOGIN</h3>

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input
            id="emailInput"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input
            id="passwordInput"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>

        {state === "ADMIN" ? (
          <p className="mt-3 text-center">
            Doctor Login?{" "}
            <span className="text-info cursor-pointer" onClick={() => setState("DOCTOR")}>
              Click here
            </span>
          </p>
        ) : (
          <p className="mt-3 text-center">
            Admin Login?{" "}
            <span className="text-info cursor-pointer" onClick={() => setState("ADMIN")}>
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
