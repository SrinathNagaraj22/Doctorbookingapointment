import express from 'express'
import { bookappointment, getProfile, loginUser, registerUser, updateProfile } from '../controllers/usercontroller.js'
import { UserAuth } from '../middleware/userauth.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/getprofile',UserAuth, getProfile)
userRouter.post('/updateprofile', upload.single('image'),UserAuth, updateProfile)
userRouter.post('/bookappointment', UserAuth, bookappointment)
export default userRouter