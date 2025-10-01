import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminroute.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectcloudinary()

//Middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin', adminRouter)
app.get('/',(req,res)=>{
    res.send('api working great')
})
app.listen(port,()=>console.log("server started", port))
