import validator from "validator";
import bcrypt from "bcrypt";
import usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctormodel from "../models/doctormodel.js";
import appointmentModel from "../models/appointmentmodel.js";
import mongoose from "mongoose";

// Register user
const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!name || !password || !email) {
      return res
        .status(403)
        .json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(403)
        .json({ success: false, message: "Enter a valid email address" });
    }
    if (password.length < 8) {
      return res.status(403).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new usermodel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userData = await usermodel.findById(req.userId).select("-password");
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "Missing profile data",
      });
    }

    const updateData = { name, phone, address, dob, gender };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    const updatedUser = await usermodel
      .findByIdAndUpdate(req.userId, updateData, { new: true })
      .select("-password");

    res.json({
      success: true,
      message: "Profile successfully updated",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Book appointment
const bookappointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId;

    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized" });

    // Fetch doctor and check availability
    const docData = await doctormodel.findById(docId).select("-password");
    if (!docData)
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });

    if (!docData.available)
      return res
        .status(400)
        .json({ success: false, message: "Doctor not available" });

    // Check if slot is already booked
    const slots_booked = docData.slots_booked || {};
    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res
        .status(400)
        .json({ success: false, message: "Slot not available" });
    }
    if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);

    // Fetch user snapshot
    const userData = await usermodel.findById(userId).select("-password");

    // Prepare appointment data
    const appointmentData = {
      userId: new mongoose.Types.ObjectId(userId),
      docId: new mongoose.Types.ObjectId(docId),
      userSnapshot: { ...userData._doc },
      docData: { ...docData._doc },
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
      userDate: new Date().toISOString(),
    };

    // Save appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor's booked slots
    await doctormodel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

// Get all user appointments
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized" });
    }

    const appointments = await appointmentModel
      .find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ date: -1 })
      .populate("docId", "name email speciality degree")
      .populate("userId", "name email phone gender dob address image");

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

// Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentid } = req.body;
    const userId = req.userId;

    const appointmentData = await appointmentModel.findById(appointmentid);
    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (String(appointmentData.userId) !== String(userId)) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentid, {
      cancelled: true,
    });
    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctormodel.findById(docId);
    let slots_booked = docData.slots_booked || {};
    slots_booked[slotDate] = slots_booked[slotDate]?.filter(
      (e) => e !== slotTime
    );
    await doctormodel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookappointment,
  listAppointment,
  cancelAppointment,
};