import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"unauthorized,No token Available"});
        }
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"unauthorized,Invalid token"})
        }
        const user=await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({message:"user not found"})
        }
        req.user=user;
        next();

    } catch (error) {
        console.log("Error in middleware", error.message);
        res.status(500).json({ message: "Internal Server Error" });



    }
}