// pages/Login.jsx
import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [state, setState] = useState("ADMIN"); // ADMIN or DOCTOR
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, setUserType, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const url =
        state === "ADMIN"
          ? backendUrl + "/api/admin/login"
          : backendUrl + "/api/doctor/login";

      const { data } = await axios.post(url, { email, password });

      if (data.success) {
        localStorage.setItem("AToken", data.token);
        localStorage.setItem("userType", state);
        setAToken(data.token);
        setUserType(state);
        toast.success("Login successful!");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={onSubmitHandler}
        className="p-4 border rounded"
        style={{ minWidth: "350px" }}
      >
        <p className="text-center fs-4 mb-4 fw-bold">
          <span className="fw-bold">{state}</span> LOGIN
        </p>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        {state === "ADMIN" ? (
          <p>
            Doctor Login?
            <span
              className="text-primary underline ms-3 cursor-pointer"
              onClick={() => setState("DOCTOR")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?
            <span
              className="text-primary underline cursor-pointer ms-3"
              onClick={() => setState("ADMIN")}
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
