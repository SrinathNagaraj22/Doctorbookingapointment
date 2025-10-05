import doctormodel from "../models/doctormodel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentmodel.js"
import mongoose from "mongoose";


const changeavailability = async (req, res)=>{
    try{
        const {docId} = req.body
        const docData = await doctormodel.findById(docId)
        await doctormodel.findByIdAndUpdate(docId, {available : !docData.available})
        res.json({success:true, message:'Availability changed'})

    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({success:false, message: error.message})

    }

}
const doctorList = async (req, res) => {
    try {
        const doctors = await doctormodel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// API for doctorLogin

const loginDoctor = async (req, res)=>{
    try{

        const {email, password} = req.body
        const doctor = await doctormodel.findOne({email})

        if(!doctor)
        {
            res.status(401).json({success:false, message:"Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if(isMatch)
        {
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token, docId:doctor._id})
        }
        else
        {
            res.status(401).json({success:false, message:"Invalid credentials"})
        }

    }
    catch(error)
    {
        console.log(error)
        res.status(400).json({success:false, message:error.message})
    }
}

// API to get doctor appointment for doctor panel

const appointmentDoctor = async (req, res) => {
  try {
    const { docId } = req.query;

    const appointments = await appointmentModel
      .find({ docId })
      .populate({ path: "userId", select: "name email phone gender dob address image" }) 
      .populate({ path: "docId", select: "name email speciality degree" }); 

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// API to mark appointment complete

const appointmentcomplete = async (req, res) => {
  try {
    const {  appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

    return res.json({ success: true, message: "Appointment completed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get dashboard for doctor panel 


const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId; // just use it directly

    if (!docId) {
      return res.status(400).json({ success: false, message: "docId is required" });
    }

    const appointments = await appointmentModel.find({ docId });

    let earning = 0;
    appointments.forEach((item) => {
      if (item.isCompleted) earning += item.amount;
    });

    // Get unique patients
    const patients = [...new Set(appointments.map((item) => item.userId.toString()))];

    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.slice(-5).reverse() // latest 5
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get doctor profile for doctor panel

const doctorProfile = async(req, res)=>{
  try{

    const docId = req.docId;
    const profileData = await doctormodel.findById(docId).select('-password')
    res.json({success:true, profileData});
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });

  }
};

// API to update userprofile data for doctor panel

const updateDoctorProfile = async (req, res) => {
  try {
    
    const docId = req.docId;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { fees, address, available } = req.body;

    
    const updatedDoctor = await doctormodel.findByIdAndUpdate(
      docId,
      { fees, address, available },
      { new: true } 
    );

    res.json({ success: true, message: "Profile Updated", profile: updatedDoctor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};






export  {doctorDashboard,
  changeavailability, 
  doctorList, 
  loginDoctor, 
  appointmentDoctor, 
  appointmentcomplete,
  doctorProfile,
  updateDoctorProfile
} ;