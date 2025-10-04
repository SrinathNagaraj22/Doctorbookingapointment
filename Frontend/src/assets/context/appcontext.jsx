import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

export const Appcontext = createContext();

const AppcontextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState('') 
  const [userdata, setUserdata] = useState(false)
  const navigate = useNavigate()

  

  const getDoctorsdata = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list')
      if (data.success) {
        setDoctors(data.doctors)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Loaduserprofiledata = async()=>
  {
    try{
      const {data}= await axios.get(`${backendUrl}/api/user/getprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(data.success)
      {
        setUserdata(data.userdata)
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

  const bookappointment = async()=>
  {
    if(!token)
    {
      toast.warning("Login to book appointment")
      return navigate('/login')
    }
  }
  const value = { 
    doctors,
    token, 
    setToken,
    backendUrl, 
    userdata, 
    setUserdata,
    Loaduserprofiledata,
    getDoctorsdata
   }

  useEffect(() => {
    getDoctorsdata()
  }, [])

  useEffect(()=>{
    if(token)
    {
      Loaduserprofiledata()
    }
    else{
      setUserdata(false)
    }
    

  },[token])

  return (
    <Appcontext.Provider value={value}>
      {props.children}
    </Appcontext.Provider>
  );
};

export default AppcontextProvider;
