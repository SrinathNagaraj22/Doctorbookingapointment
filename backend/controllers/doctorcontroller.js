import doctormodel from "../models/doctormodel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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
            res.json({success:true,token})
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

export  {changeavailability, doctorList, loginDoctor} ;