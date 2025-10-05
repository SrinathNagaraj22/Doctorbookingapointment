import jwt from "jsonwebtoken";

const doctorAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    const dtoken = authHeader.split(" ")[1]; 
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.docId = decoded.id; 
    next();
  } catch (error) {
    console.error("UserAuth error:", error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export { doctorAuth };
