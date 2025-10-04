import jwt from "jsonwebtoken";

const UserAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    const token = authHeader.split(" ")[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.error("UserAuth error:", error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export { UserAuth };
