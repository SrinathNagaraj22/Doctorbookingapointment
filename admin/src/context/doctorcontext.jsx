
import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const DoctorContext = createContext();


export const DoctorContextProvider = ({ children }) => {
  const [DToken, setDToken] = useState(localStorage.getItem("DToken") || "");
  const [docId, setDocId] = useState(localStorage.getItem("docId") || "");
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") === "DOCTOR" ? "DOCTOR" : ""
  );
  const [appointment, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)
  const [profile, setProfile] = useState(false)

  const getAppointments = async ()=>{
    try{

      const { data } = await axios.get(
      `${backendUrl}/api/doctor/appointments?docId=${docId}`,
      {
        headers: { Authorization: `Bearer ${DToken}` }
      }
      );
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

  const backendUrl = import.meta.env.VITE_BACKEND_URL; 
  const completeappointment = async(appointmentId)=>{
    try{
      const {data}= await axios.post(`${backendUrl}/api/doctor/completeappointment`, {appointmentId}, {
        headers: {
          Authorization: `Bearer ${DToken}`,
        },
      })
      if(data.success)
      {
        toast.success(data.message)
        getAppointments()
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

  const getDashData = async()=>{
    try{
      const {data}= await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: {
          Authorization: `Bearer ${DToken}`,
        },
      })
      if(data.success)
      {
        setDashData(data.dashData)
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

  const getProfileData = async()=>{
    try{
      const {data}= await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: {
          Authorization: `Bearer ${DToken}`,
        },
      })
      if(data.success)
      {
        setProfile(data.profileData)
      }

    }
    catch(error)
    {
      toast.error(error.message)
    }
  }


  return (
    <DoctorContext.Provider
      value={{
        DToken,
        setDToken,
        userType,
        setUserType,
        backendUrl,
        appointment,
        setAppointments,
        getAppointments,
        docId,
        setDocId,
        completeappointment,
        dashData,
        setDashData,
        getDashData,
        profile,
        setProfile,
        getProfileData
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
