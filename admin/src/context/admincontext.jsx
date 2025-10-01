// context/AdminContext.jsx
import { useState, createContext } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  // Initialize from localStorage so refresh keeps login
  const [aToken, setAToken] = useState(localStorage.getItem("AToken") || "");
  const [userType, setUserType] = useState(localStorage.getItem("userType") || "");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <AdminContext.Provider
      value={{
        aToken,
        setAToken,
        userType,
        setUserType,
        backendUrl,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
