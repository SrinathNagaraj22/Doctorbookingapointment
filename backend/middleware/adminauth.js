import jwt from "jsonwebtoken";

const Adminauth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ success: false, message: "Unauthorized admin" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
      return res.status(401).json({ success: false, message: "Unauthorized admin" });

    next();
  } catch (error) {
    console.error("Adminauth Error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default Adminauth;
