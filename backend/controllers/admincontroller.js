import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import DoctorModel from "../models/doctormodel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentmodel.js";
import usermodel from "../models/usermodel.js";
import doctormodel from "../models/doctormodel.js";

// Controller to add a doctor
const addDoctor = async (req, res) => {
  try {
    // Destructure fields from request body
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address 
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Password length check
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Convert available to boolean (from string if using FormData)
    const isAvailable = available === "true" || available === true;

    // Upload image to Cloudinary
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({
        success: false,
        message: "Doctor image is required",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create doctor object
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available: isAvailable,
      image: imageUrl,
      date: Date.now(),
      slots_booked: {},
    };

    // Save doctor to DB
    const newDoctor = new DoctorModel(doctorData);
    await newDoctor.save();

    return res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("AddDoctor Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// API FOR ADMIN LOGIN
const loginAdmin = async(req,res)=>
{
    try{
        const {email, password} = req.body


        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        }
        else{
            res.status(401).json({success:false , message:"Unauthorized User"})
        }
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false, Message:"Error occured"})
    }
}

//api to get all doctors list
const alldoctors = async (req,res)=>{
  try{

    const doctors=await DoctorModel.find({}).select('-password')
    res.json({success:true,doctors})

  }
  catch(error){
    console.log(error)
    res.status(500).json({success:false,message:error.message})

  }

}

//API to get Allappointment list

const appointmentAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});

    
    const detailedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        const userData = await usermodel
          .findById(appointment.userId)
          .select("-password"); 
        const docData = await doctormodel.findById(appointment.docId);

        return {
          ...appointment._doc,
          userData,
          docData,
        };
      })
    );

    res.json({ success: true, appointments: detailedAppointments });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//API to cancel the appointment

const appointmentcancel = async (req, res) => {
  try {
    const { appointmentid } = req.body;             

    const appointmentData = await appointmentModel.findById(appointmentid);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    

    await appointmentModel.findByIdAndUpdate(appointmentid, { cancelled: true });
    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctormodel.findById(docId);
    let slots_booked = docData.slots_booked || {};
    slots_booked[slotDate] = slots_booked[slotDate]?.filter(e => e !== slotTime);
    await doctormodel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// API to get dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctormodel.find({});
    const users = await usermodel.find({});

    const latestAppointments = await appointmentModel
  .find({})
  .sort({ date: -1 })
  .limit(10)
  .populate({ path: "userId", model: "user", select: "-password" })
  let completed = 0;
    latestAppointments.forEach((item) => {
       (item.isCompleted)? completed+=1 : completed+=0;
    });

    const dashData = {
      completed,
      doctors: doctors.length,
      appointments: await appointmentModel.countDocuments(), 
      patients: users.length,
      latestAppointments, 
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};





export { addDoctor, loginAdmin,  alldoctors, appointmentAdmin, appointmentcancel, adminDashboard };
