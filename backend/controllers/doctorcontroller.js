import doctormodel from "../models/doctormodel.js"



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

export default changeavailability