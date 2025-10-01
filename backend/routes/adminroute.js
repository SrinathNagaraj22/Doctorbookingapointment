import express from 'express'
import { addDoctor, loginAdmin } from '../controllers/admincontroller.js'
import upload from '../middleware/multer.js'
import Adminauth from '../middleware/adminauth.js'

const adminRouter = express.Router()

adminRouter.post('/addDoctor', Adminauth,upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
export default adminRouter