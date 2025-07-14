import bcrypt from "bcryptjs"

import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"
import cookieParser from "cookie-parser"

// Registering User
export const RegisterUser = async(req, res) => {
        const { name , email , password} = req.body;

        const userexits  = await User.findOne({email});

        // I wish i had return in {}
        if(userexits) return res.status(400).json({ message: "User already exists" });


        // Dont add to much salt hahah
        const hashedpassword = await bcrypt.hash(password , 10)

        const user = await User.create({
            name, 
            email,
            password : hashedpassword
        })

        generateToken(res, user._id);

        // Dont give password to the userr..
     
      res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

}

// Login the user 

export const LoginUser = async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email})

    if(!user) return res.status(400).json({message : "Invalid credentials"})

    const IsMatch = await bcrypt.compare(password, user.password);
    
    // I know saying password in status is bad practise still who cares 
    // Its my project my choices
    if(!IsMatch) return res.status(400).json({message : "Invalid credentials (Hint) Password"})

    generateToken(res, user._id);

      res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
}

export const LogoutUser = async(req,res)=> {
    res.clearCookie("jwt",{
        httpOnly : true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).json({message : "Logged out successfully"});
}