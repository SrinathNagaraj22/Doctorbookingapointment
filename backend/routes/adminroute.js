import express from "express";

import upload from "../middleware/multer.js"; // multer setup for image upload
import Adminauth from "../middleware/adminauth.js";
import { addDoctor, alldoctors, loginAdmin } from "../controllers/admincontroller.js";
import {changeavailability} from "../controllers/doctorcontroller.js";


const router = express.Router();

router.post("/login", loginAdmin);
router.post("/addDoctor", Adminauth, upload.single("image"),  addDoctor);
router.post("/all-doctors", Adminauth, alldoctors)
router.post("/changeavailability", Adminauth, changeavailability)

export default router;
