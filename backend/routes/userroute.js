import express from 'express'
import { bookappointment, cancelAppointment, getProfile, listAppointment, loginUser, registerUser, updateProfile } from '../controllers/usercontroller.js'
import { UserAuth } from '../middleware/userauth.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/getprofile',UserAuth, getProfile)
userRouter.post('/updateprofile', upload.single('image'),UserAuth, updateProfile)
userRouter.post('/bookappointment', UserAuth, bookappointment)
userRouter.get('/appointments', UserAuth,listAppointment)
userRouter.post('/cancelappointment', UserAuth, cancelAppointment)


export default userRouter