import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import DoctorModel from "../models/doctormodel.js";
import jwt from 'jsonwebtoken'

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

    // Parse address safely if it is a string
    // let parsedAddress = {};
    // try {
    //   parsedAddress =
    //     typeof address === "string" ? JSON.parse(address) : address;
    // } catch (err) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid address format",
    //   });
    // }

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

export { addDoctor, loginAdmin,  alldoctors };
