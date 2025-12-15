import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }
        if (password.length < 5) {
            return res.status(400).json({ message: "Password must be at least 5 characters long", success: false })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already exists", success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        if (user) {
            generateToken(user._id, res);
            await user.save();
            res.status(201).json({
                _id: user._id,
                name: user.name,
                eamil: user.eamil,
                profilePic: user.profilePic,
                message: "User craeted successfully",
                success: true
            })

        }
        else{
            res.status(500).json({message:"Invalid user data"});
        }


    } catch (error) {

        console.log("error in signup", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};