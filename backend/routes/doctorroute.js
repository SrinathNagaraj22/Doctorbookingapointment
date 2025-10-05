import express from 'express';
import { appointmentcomplete, appointmentDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile } from '../controllers/doctorcontroller.js';
import { doctorAuth } from '../middleware/doctorauth.js';
 
const doctorRouter = express.Router()

doctorRouter.get("/list" , doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', doctorAuth, appointmentDoctor)
doctorRouter.post('/completeappointment', doctorAuth, appointmentcomplete)
doctorRouter.get('/dashboard', doctorAuth, doctorDashboard)
doctorRouter.get('/profile', doctorAuth,  doctorProfile)
doctorRouter.post('/updateprofile', doctorAuth, updateDoctorProfile)


export default doctorRouter