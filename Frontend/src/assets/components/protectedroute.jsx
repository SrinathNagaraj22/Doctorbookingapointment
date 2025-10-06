import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Appcontext } from "../context/appcontext.jsx";

function ProtectedRoute({ children }) {
  const { token } = useContext(Appcontext);
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location, showToast: true }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;
