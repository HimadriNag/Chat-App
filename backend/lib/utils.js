import jwt from "jsonwebtoken";

export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d",});
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
     
        secure:isProduction,
        sameSite:isProduction?"none":"lax",
    });
    return token;

}