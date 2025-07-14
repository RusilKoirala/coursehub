import jwt from "jsonwebtoken"


import User from "../models/User.js"

const protect = async(req,res,next )=>{
    try {
        const token = req.cookies.jwt;
        
        if (!token){
            // HEHEHEH GAURDS ATTTTACKKKKK
            return res.status(401).json({ message: "You are not authorized" });
        }
        console.log("Token from cookie:", token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select("-password");
            next();
      
    } catch (error) {
        console.log("Auth middleware error : " ,error);
        res.status(401).json({message: "u created a bug so i fire you out"})
    }
}

export default protect;