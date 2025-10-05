// context/AdminContext.jsx
import { useState, createContext } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("AToken") || "");
  
  const [userType, setUserType] = useState(localStorage.getItem("userType") || "");
  const [doctors, setDoctors]= useState([])
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)
  const token = aToken || localStorage.getItem("AToken");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async ()=>{
    try{

      const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(data.success)
      {
        setDoctors(data.doctors)
        console.log(data.doctors)

      }
      else{
        toast.error(error.message)
      }

    }
    catch(error)
    {

    }
  }

  const changeavailability = async (docId)=>{
    try{
      const {data}= await axios.post(`${backendUrl}/api/admin/changeavailability`, {docId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(data.success)
      {
        toast.success(data.message)
        getAllDoctors()
      }
      else{
        toast.error(data.message)
      }

    }
    catch(error)
    {
      toast.error(error.message)
    }
  }

  const getAllAppointments = async()=>{
    try{
      const {data}= await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

    })
    if(data.success)
    {
      setAppointments(data.appointments)
    }
    else{
      toast.error(data.message)
    }
  
  
  
  }
    catch(error)
    {
      console.log(error)
      toast.error(error.message)

    }
}
    const cancelappointment = async(appointmentid)=>{

      try{

        const {data}= await axios.post(`${backendUrl}/api/admin/cancel-appointment`, {appointmentid}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

    })
    if(data.success)
    {
      toast.success(data.message)
      getAllAppointments()
    }
    else{
      toast.error(data.message)
    }
        

      }
      catch(error)
      {
        toast.error(error.message)
      }

    }

    const getDashData = async()=>{
      try{
        const {data}= await axios.get(`${backendUrl}/api/admin/dashboard`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },

    })
    if(data.success)
    {
      setDashData(data.dashData)
      console.log(data.dashData)
    }
    else
    {
      toast.error(data.message)
    }
  }
  catch(error)
  {
    toast.error(error.message)

  }
    }
      return (
    <AdminContext.Provider
      value={{
        aToken,
        setAToken,
        userType,
        setUserType,
        backendUrl,
        doctors,
        getAllDoctors, 
        changeavailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelappointment,
        getDashData,
        dashData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
